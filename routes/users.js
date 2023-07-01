var express = require("express");
var router = express.Router();
const {
  createUserModel,
  getUserByEmailModel,
  getUserByIdModel,
  updateUserModel,
  addUserSessionModel,
  deleteUserSessionModel
} = require("../models/users");
const session = require("express-session");

// router.use(async (req,res,next)=>{
//   if(req.session.user){
//     next()
//   }else
//     res.json({status:"error",msg:"Unauthorized"});
// })

/* GET users listing. */
router.get("/:id", async function (req, res, next) {
  const emailRegex = /\S+@\S+\.\S+/;
  if (req.params.id.match(emailRegex)) {
    var result = await getUserByEmailModel(req.params.id);
  } else {
    var result = await getUserByIdModel(req.params.id);
  }
  res.json(result);
});

router.post("/create", async function (req, res) {
  let result = await createUserModel(req.body);
  if (result.hasOwnProperty("errorCode")) {
    res.statusCode = result.errorCode;
  }
  res.json(result);
});

router.patch("/update", async function (req, res) {
  let result = await updateUserModel(req.session.user._id,{
    "firstName": req.body.firstName ? req.body.firstName : req.session.user.firstName ? req.session.user.firstName : null,
    "lastName": req.body.lastName ? req.body.lastName : req.session.user.lastName ?  req.session.user.lastName : null,
    "username": req.body.username ? req.body.username : req.session.user.username ?  req.session.user.username : null,
  });
  // if (result.hasOwnProperty("errorCode")) {
  //   res.statusCode = result.errorCode;
  // }
  res.json(result);
});

router.patch('/session/add',async function(req,res){
  let result = await addUserSessionModel(req.session.user_id,{
    "sessionId":req.sessionID,
    "token":"ineffabledeeps"
  })
    res.json(result)
});

router.patch('/session/delete',function(req,res){

});

router.put("/:id", function (req, res) {});

router.delete("/:id", function (req, res) {});
module.exports = router;
