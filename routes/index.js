const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(first_name && last_name && email && password)) {
      res.status(400).send("All inputs are required");
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User already exists");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    res.status(201).json(token);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      res.status(201).send(token);
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/", verifyToken, (req, res) => {
  res.send("Welcome");
});

router.delete("/", (req, res) => {
  res.send("Deleted some data");
});

module.exports = router;
