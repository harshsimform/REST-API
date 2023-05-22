const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Getting all
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  try {
    const products = await Product.find().limit(limit);
    const allData = {
      productDetails: products,
    };
    res.json(allData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getProduct, (req, res) => {
  res.json(res.product);
});

// Creating one
router.post("/", async (req, res) => {
  const product = new Product({
    productName: req.body.productName,
    productCategory: req.body.productCategory,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getProduct, async (req, res) => {
  if (req.body.productName != null) {
    res.product.productName = req.body.productName;
  }
  if (req.body.productCategory != null) {
    res.product.productCategory = req.body.productCategory;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await res.product.deleteOne();
    res.json({ message: "Deleted Product" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

module.exports = router;

// 500 - means something wrong with your server/database
// 201 - means successfully created object i.e. newUser
// 400 - means something wrong with user input and not something wrong with your server
