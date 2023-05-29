const mongoose = require("mongoose");
const Joi = require("joi");

const appointmentSchema = new mongoose.Schema({
  doc_id: mongoose.Schema.Types.ObjectId,
  pat_id: mongoose.Schema.Types.ObjectId,
  start_time: Number,
  end_time: Number,
});
const Appointment = mongoose.model("Appointment", appointmentSchema);

function validate(appointment) {
  const Schema = {
    doc_id: Joi.required(),
    start_time: Joi.date().timestamp().required(),
    end_time: Joi.date().timestamp().greater(Joi.ref("start_time")).required(),
  };
  return Joi.validate(appointment, Schema);
}

module.exports.Appointment = Appointment;
module.exports.validate = validate;
