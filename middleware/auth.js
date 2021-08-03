const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["authorization"].split(" ")[1];
  if (!token) {
    res.status(401).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = verifyToken;
