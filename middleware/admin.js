const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    if (req.user.role != "admin") {
      return res.status(401).send("Not an admin");
    }
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
};
