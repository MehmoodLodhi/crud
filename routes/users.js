const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const otpGenerator = require("otp-generator");

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
  const user = await User.findOne({
    email: email,
  });
  ////////////
  if (user) return res.send("User Already exist");
  try {
    const user = new User(req.body);
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
    await ourMail(user.email, otp);
    await user.save();
    res.status(200).send({ token });
  } catch (e) {
    res.send(e);
  }
});

router.delete("/deleteOne", [auth, admin], async (req, res) => {
  const user = await User.findByIdAndDelete({ _id: req.body.id });

  res.send(user);
});

module.exports = router;
