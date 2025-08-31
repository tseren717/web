const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = "./data/users.json";

// Signup
router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(path));
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ msg: "User exists" });
  }
  users.push({ username, password });
  fs.writeFileSync(path, JSON.stringify(users, null, 2));
  res.json({ msg: "Signup successful" });
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(path));
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ msg: "Invalid credentials" });
  res.json({ msg: "Login successful", username: user.username });
});

module.exports = router;
