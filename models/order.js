const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  products: [],
  bill: Number,
  name: String,
});

function validate(order) {
  const Schema = {
    products: Joi.required(),
  };
  return Joi.validate(order, Schema);
}

const Order = mongoose.model("Orders", orderSchema);

module.exports.Order = Order;
module.exports.validate = validate;
