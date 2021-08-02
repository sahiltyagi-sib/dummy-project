const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcryptjs");

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
