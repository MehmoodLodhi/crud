const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const { User } = require("../models/user");
const { Otp } = require("../models/otp");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  //////
  const user = await User.findOne({
    email: req.body.email,
  });
  ////////////
  if (!user) return res.status(400).send("Invalid User or password");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");
  const token = user.authToken();
  const userotp = await Otp.findOne({ user_id: user._id });
  if (userotp.isExpire == false) {
    let response = {
      token: token,
      status: "user not verified",
    };
    return res.send(response);
  }
  console.log(userotp);

  res.send(token);
});
//Login Input validation
function validate(user) {
  const Schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  };
  return Joi.validate(user, Schema);
}

router.post("/token", async (req, res) => {
  const tkn = req.body.token;
  try {
    const decode = jwt.verify(tkn, process.env.COMPUTERNAME);
    const user = await User.findOne({
      email: decode.email,
    });
    if (user) {
      res.send(true);
    }
  } catch (ex) {
    // res.status(400).send("invalid token");
    res.send(false);
  }
});
module.exports = router;
