const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const app = express();

// Middleware to handle JSON requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API updated");
});

//get all Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get a specific product
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//add a new product
app.post("/api/products/:id", async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//update a product
app.put("/api/product/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      } 
      const updatedProduct = await Product.findById(id);
      res.status(200).json({ updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
        }
    });

//delete a product
app.delete("/api/product/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

mongoose
  .connect(
    "mongodb+srv://semjasa83:123Admin@atlascluster.5j6egy5.mongodb.net/JoinV3_db?retryWrites=true&w=majority&appName=AtlasCluster"
  )
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
