const express = require("express");
const router = express.Router();
const {
  createUserModel,
  getUserByEmailModel,
  getUserByUsernameModel,
  getUserByMobileNumberModel,
} = require("../models/users");
const session = require("express-session");

router.post("/login", async function (req, res) {
  var result = await getUserByEmailModel(req.body.email);
  if (result.status == "success") {
    if (result.data.password == req.body.password) {
      req.session.user = result.data;
    } else {
      result = {
        status: "error",
        errorCode: 403,
        msg: "EmailAndPasswordDoesNotMatch",
      };
    }
  }
  // if (result.hasOwnProperty("errorCode")) {
  //   res.statusCode = result.errorCode;
  // }
  res.json(result);
});

router.post("/signup", async function (req, res) {
  const emailRegex = /\S+@\S+\.\S+/;
  var body = {
    fullName: req.body.fullName,
    mobileNumber: req.body.mobileEmail,
    username: req.body.username,
    password: req.body.password,
  };
  if (req.body.mobileEmail.match(emailRegex)) {
    body = {
      fullName: req.body.fullName,
      email: req.body.mobileEmail,
      username: req.body.username,
      password: req.body.password,
    };
  }
  
  let duplicate = true;
  if (body.email) {
    duplicate =
      (await getUserByEmailModel(req.body.mobileEmail)).status === "success"
        ? "Email"
        : null;
  }
  else if(body.mobileNumber){
    duplicate =
      (await getUserByMobileNumberModel(req.body.mobileEmail)).status === "success"
        ? "MobileNumber"
        : null;
  }
  duplicate =
    (await getUserByUsernameModel(req.body.username)).status === "success"
      ? "Username"
      : duplicate;

  if (!duplicate) {
    var result = await createUserModel(body);
  } else {
    result = {
      status: "error",
      errorCode: 403,
      msg: `${duplicate}AlreadyExists`,
    };
  }
  res.json(result);
});

router.post("/googleLogin", function (req, res) {
  res.json({ status: "error", msg: "GoogleLoginIsNotSupportedYet" });
});

module.exports = router;
