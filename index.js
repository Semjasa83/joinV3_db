require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.route.js");
const contactRoutes = require("./routes/contact.route.js");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: 'localhost:4200',
  optionsSuccessStatus: 200,
}

// Middleware to handle CORS
app.use(cors(corsOptions));

// Middleware to handle JSON requests and URLendcoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// definition of the routes
app.use("/api/products", productRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Node API updated");
});

// Validate environment variables
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined.");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });