const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = "./data/products.json";

// Get all products
router.get("/", (req, res) => {
  const products = JSON.parse(fs.readFileSync(path));
  res.json(products);
});

// Add product
router.post("/", (req, res) => {
  const products = JSON.parse(fs.readFileSync(path));
  products.push(req.body);
  fs.writeFileSync(path, JSON.stringify(products, null, 2));
  res.json({ msg: "Product added", product: req.body });
});

module.exports = router;
