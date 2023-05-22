const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 15,
  },
  price: Number,
  quantity: Number,
  size: String,
});

const Product = mongoose.model("Products", productSchema);

function validate(pro) {
  const Schema = {
    name: Joi.string().min(5).required(),
    price: Joi.number(),
    quantity: Joi.number(),
    size: Joi.string(),
  };
  return Joi.validate(pro, Schema);
}

module.exports.Product = Product;
module.exports.validate = validate;
