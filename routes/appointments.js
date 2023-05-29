const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const patient = require("../middleware/patient");

const { Appointment, validate } = require("../models/appointment");

router.post("/makeapp", [auth, patient], async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.send(error.details[0].message);
  }
  const appointment = new Appointment({ ...req.body, pat_id: req.user._id });
  await appointment.save();
  res.send("Appointment Added");
});

router.get("/getApp", auth, async (req, res) => {
  if (req.user.role == "doctor") {
    const apps = await Appointment.find({ doc_id: req.user._id });
    return res.send(apps);
  }
  if (req.user.role == "patient") {
    const apps = await Appointment.find({ pat_id: req.user._id });
    return res.send(apps);
  }
  const apps = await Appointment.find();
  res.send(apps);
});

module.exports = router;
