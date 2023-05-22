const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const { User } = require("../models/user");

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
module.exports = router;
