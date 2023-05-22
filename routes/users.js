const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

const { User, validate } = require("../models/user");

router.get("/getUsers", auth, async (req, res) => {
  try {
    const users = await User.find().select(["_id", "name", "email"]);
    res.send(users);
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
  const user = await User.findOne({
    email: req.body.email,
  });
  ////////////
  if (user) return res.send("User Already exist");
  try {
    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = user.authToken();
    await user.save();
    res.send(token);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
