const express = require("express");
const router = express.Router();
const { Product, validate } = require("../models/product");

router.post("/add", async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.send(error.details[0].message);
  }

  const product = new Product(req.body);
  await product.save();
  res.send("Product Added");
});

router.get("/get", async (req, res) => {
  const Products = await Product.find().select("-__v");
  res.send(Products);
});
router.delete("/delete", async (req, res) => {
  const Products = await Product.deleteMany();
  res.send(Products);
});

router.delete("/deleteOne", async (req, res) => {
  //console.log(req.body._id);
  const Products = await Product.deleteOne({ _id: req.body.id });

  res.send(Products);
});
module.exports = router;
