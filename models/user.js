const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, minLength: 5, maxLenght: 15 },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  address: String,
});
userSchema.methods.authToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.COMPUTERNAME
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validate(user) {
  const Schema = {
    name: Joi.string().min(5).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  };
  return Joi.validate(user, Schema);
}

module.exports.User = User;
module.exports.validate = validate;
