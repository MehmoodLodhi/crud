const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth");
  if (!token) return res.status(401).send("Unauthorized no token provided");
  try {
    const decode = jwt.verify(token, process.env.COMPUTERNAME);
    req.user = decode;
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
};
