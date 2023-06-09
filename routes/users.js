const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const otpGenerator = require("otp-generator");
var nodemailer = require("nodemailer");

const { User, validate } = require("../models/user");
const { Otp } = require("../models/otp");
const { ourMail } = require("../mail");

router.get("/getUsers", auth, async (req, res) => {
  try {
    if (req.user.role == "admin") {
      const users = await User.find();
      return res.send(users);
    }
    if (req.user.role == "doctor") {
      const users = await User.find({ role: "patient" });
      return res.send(users);
    }
    if (req.user.role == "patient") {
      const users = await User.find({ role: "doctor" });
      return res.send(users);
    }

    res.send("Invalid Role");
  } catch (e) {
    res.send(e);
  }
});

router.post("/addUser", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  //////
  const email = req.body.email.toLowerCase();
  let user = await User.findOne({
    email: email,
  });
  ////////////
  if (user) return res.send("User Already exist");

  user = new User(req.body);
  user.email = email;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const token = user.authToken();
  //Generate and save User Otp
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const user_otp = new Otp({ user_id: user._id, value: otp });
  await user_otp.save();

  // await ourMail(user.email, otp);
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mehmoodlodhi3@gmail.com",
      pass: "picscecsxaqjcbjd",
    },
  });
  let mailOptions = {
    from: "mehmoodlodhi3@gmail.com",
    to: user.email,
    subject: "OTP here",
    html: "Hello kiddan pharo apna OTP: " + otp,
  };
  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) console.log(error);
    else {
      console.log(response);
    }
  });
  // await ourMail(user.email, otp);
  await user.save();
  return res.status(200).send({ token });
});

router.delete("/deleteOne", [auth, admin], async (req, res) => {
  const user = await User.findByIdAndDelete({ _id: req.body.id });

  res.send(user);
});

router.delete("/deleteAll", async (req, res) => {
  const user = await User.deleteMany();

  res.send(user);
});

module.exports = router;
