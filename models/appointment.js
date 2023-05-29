const mongoose = require("mongoose");
const Joi = require("joi");

const appointmentSchema = new mongoose.Schema({
  doc_id: mongoose.Schema.Types.ObjectId,
  pat_id: mongoose.Schema.Types.ObjectId,
  time: Date,
});
const Appointment = mongoose.model("Appointment", appointmentSchema);

function validate(appointment) {
  const Schema = {
    doc_id: Joi.required(),
    pat_id: Joi.required(),
    time: Joi.required(),
  };
  return Joi.validate(appointment, Schema);
}

module.exports.Appointment = Appointment;
module.exports.validate = validate;
