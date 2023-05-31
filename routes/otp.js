const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const otpGenerator = require("otp-generator");

const { Otp, validate } = require("../models/otp");

router.post("/verifyOtp", auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.send(error.details[0].message);
  }

  const userotp = await Otp.findOne({ user_id: req.user._id });
  if (userotp.value != req.body.value) {
    return res.send("Invalid Otp");
  }

  userotp.isExpire = true;
  await userotp.save();
  res.send("user otp verified");

  //  console.log(userotp);
});

module.exports = router;
