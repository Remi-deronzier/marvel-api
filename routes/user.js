const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

// Route signup
router.post("/user/signup", async (req, res) => {
  console.log("route: /user/signup");
  console.log(req.fields);
  try {
    if (await User.findOne({ email: req.fields.email })) {
      res.status(409).json({ message: "Email already used" });
    } else if (!req.fields.username) {
      res.status(400).json({ message: "You must indicate a username" });
    }
    const password = req.fields.password;
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const newUser = new User({
      email: req.fields.email,
      username: req.fields.username,
      token: uid2(64),
      hash: hash,
      salt: salt,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route login
router.post("/user/login", async (req, res) => {
  console.log("route: /user/login");
  console.log(req.fields);
  try {
    const user = await User.findOne({ email: req.fields.email });
    if (!user) {
      res.status(400).json({ message: "First you must register" });
    } else {
      const password = req.fields.password;
      const salt = user.salt;
      const hash = SHA256(password + salt).toString(encBase64);
      if (hash === user.hash) {
        const resValue = {
          _id: user._id,
          token: user.token,
          username: user.username,
        };
        res.status(200).json(resValue);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
