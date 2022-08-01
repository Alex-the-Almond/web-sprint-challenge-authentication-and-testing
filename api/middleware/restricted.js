const jwt = require("jsonwebtoken");
require("dotenv");
const secret = process.env.SECRET || "shenanigans";
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(401).json({ message: "token required" });
  else jwt.verify(token, secret, (err, data) => {
      if (err) res.status(401).json({ message: "token invalid" });
      else {
        req.body = data;
        next();
      }
    });
};