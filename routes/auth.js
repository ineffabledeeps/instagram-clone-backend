const express = require("express");
const router = express.Router();
const { getUserByEmailModel } = require("../models/users");
const session = require("express-session");

router.post("/login", async function (req, res) {
  var result = await getUserByEmailModel(req.body.email);
  if (result.status == "success") {
    if (result.data.password == req.body.password){
      req.session.user = result.data;
    }
    else {
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

router.post("/googleLogin", function (req, res) {
  res.json({ status: "error", msg: "GoogleLoginIsNotSupportedYet" });
});

module.exports = router;
