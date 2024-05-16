const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.route.js");
const contactRoutes = require("./routes/contact.route.js");
const app = express();

// definition of the routes
app.use("/api/products", productRoutes);
app.use("/api/contacts", contactRoutes);

// Middleware to handle JSON requests and URLendcoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from Node API updated");
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
