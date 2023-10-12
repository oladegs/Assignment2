const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const Categories = require("./models/categoriesModel");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// access website through Web browser : Declare Route
app.get("/", (req, res) => {
  res.send(`{"message" : "Welcome to DressStore Application."}`);
});

// Get all products from the database
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a product by id from the database
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new product to the database
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update product by id to the Database
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove product by id from the Database
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connecting to the database
mongoose
  .connect(
    "mongodb+srv://dbuser:YQYOl2hssbt01S0J@cluster0.u5befez.mongodb.net/DressStore?retryWrites=true&w=majority&appName=AtlasApp"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log(`DressStore app is running on 3000`);
    });
  })
  .catch(() => {
    console.log(error);
  });

mongoose.set("strictQuery", false);
