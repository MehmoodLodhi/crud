const express = require("express");
const router = express.Router();
const { Order, validate } = require("../models/order");
const { Product } = require("../models/product");
const auth = require("../middleware/auth");
const { User } = require("../models/user");

router.post("/add", auth, async (req, res) => {
  // console.log(req.user);

  const { error } = validate(req.body);

  if (error) {
    return res.send(error.details[0].message);
  }
  const order = new Order(req.body);
  let products = req.body.products;
  let bill = 0;
  let temp = [];

  for (let index = 0; index < products.length; index++) {
    let pro = await Product.findById(products[index].productId);

    if (pro.quantity < products[index].quantity) {
      // res.send("Only " + pro.quantity + " " + pro.name + " are available");
      temp.push("Only " + pro.quantity + " " + pro.name + " are available");
    }
  }
  if (temp.length > 0) {
    res.send(temp);
    return;
  }

  for (let index = 0; index < products.length; index++) {
    let pro = await Product.findById(products[index].productId);
    /////////////////////////////

    //chekc quantity
    bill += pro.price * products[index].quantity;
    pro.quantity -= products[index].quantity;
    await pro.save();
  }
  let user = await User.findById(req.user._id).select("name");
  order.user = req.user._id;
  order.name = user.name;
  order.bill = bill;
  await order.save();
  res.send("Order Added");
});

router.get("/get", async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

router.delete("/delete", async (req, res) => {
  const orders = await Order.deleteMany();
  res.send(orders);
});

router.get("/getUserOrder", auth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

router.delete("/deleteone", auth, async (req, res) => {
  const order = await Order.findById(req.body._id);
  if (order.user == req.user._id) {
    const orders = await Order.deleteOne({ _id: req.body._id });
    res.send(orders);
  } else {
    res.send("Black Sheep");
  }
});

module.exports = router;
