const fs = require("fs");
const path = require("path")
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const user = require("./routes/users");
const { getuser } = require("./Utility");
const product = require("./routes/products");
const order = require("./routes/orders");
const auth = require("./routes/auth");
const appointment = require("./routes/appointments");
const otp = require("./routes/otp");
const joke = require("./routes/joke");

const app = express();
app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/product", product);
app.use("/api/order", order);
app.use("/api/appointment", appointment);
app.use("/api/otp", otp);
app.use("/api", joke);

app.get("/", (req, res) => {
  res.send("Server Configured ");
});

app.get("/file/:name", (req, res) => {
  console.log(req.params.name)
  let filename = req.params.name

  console.log(filename.split(".")[1])
  const readfile = filename.split(".")[1] == "json" ? JSON.parse(fs.readFileSync(req.params.name)) : fs.readFileSync(req.params.name);
  res.setHeader('Content-Type', `application/${filename.split(".")[1]}`);
  res.setHeader('Content-Disposition', `attachment; filename=${req.params.name}`);

  res.send(readfile)

});
async function db() {
  await mongoose
    .connect(
      "mongodb+srv://admin:Px5Raht609TNLts5@cluster0.yrzolko.mongodb.net/?retryWrites=true&w=majority"
    )

    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
}

db();
