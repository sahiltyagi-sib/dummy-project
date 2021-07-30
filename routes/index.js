const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Homepage");
});

router.post("/", (req, res) => {
  res.send(req.body);
});

router.put("/", (req, res) => {
  res.send("Updated some data");
});

router.delete("/", (req, res) => {
  res.send("Deleted some data");
});

module.exports = router;
