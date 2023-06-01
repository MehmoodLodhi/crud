const mongoose = require("mongoose");
const express = require("express");
const user = require("./routes/users");
const { getuser } = require("./Utility");
const product = require("./routes/products");
const order = require("./routes/orders");
const auth = require("./routes/auth");
const appointment = require("./routes/appointments");
const otp = require("./routes/otp");
const app = express();
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/product", product);
app.use("/api/order", order);
app.use("/api/appointment", appointment);
app.use("/api/otp", otp);
app.get("/", (req, res) => {
  res.send("Server Configured ");
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
