const mongoose = require("mongoose");
const Joi = require("joi");

const otpSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  value: String,
  isExpire: { type: Boolean, default: false },
});
const Otp = mongoose.model("Otp", otpSchema);

function validate(otp) {
  const Schema = {
    value: Joi.string().required(),
  };
  return Joi.validate(otp, Schema);
}

module.exports.Otp = Otp;
module.exports.validate = validate;
