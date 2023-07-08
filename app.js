require('dotenv').config();
const createError = require('http-errors');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const hpp = require('hpp');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const {genuuid} = require('./utilities/auth')
const express = require('express');

const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const setupRouter = require('./routes/setup');
const authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin : "https://effulgent-monstera-ce581e.netlify.app", // (Whatever your frontend url is) 
  credentials: true, // <= Accept credentials (cookies) sent by the client
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(hpp());
app.use(session({
  genid: function() {
    return genuuid() // use UUIDs for session IDs
  },
  secret: process.env.SECRET,
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URI
  }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 *  12, httpOnly:true }
}))

// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/setup', setupRouter);
app.use('/auth', authRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
