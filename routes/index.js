const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Homepage");
});

router.post("/login", (req, res) => {
  let body = req.body;
  let obj = {
    username: body.name,
    age: body.age,
  };
  const token = jwt.sign(obj, "secret");
  res.send(token);
});

router.put("/", (req, res) => {
  res.send("Updated some data");
});

router.delete("/", (req, res) => {
  res.send("Deleted some data");
});

module.exports = router;
