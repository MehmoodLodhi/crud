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

  const appointment = new Appointment(req.body);
  await appointment.save();
  res.send("Appointment Added");
});

module.exports = router;
