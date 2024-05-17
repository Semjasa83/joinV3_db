const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.route.js");
const contactRoutes = require("./routes/contact.route.js");
const app = express();
const port = 3000;

// Middleware to handle CORS
app.use(cors());

// Middleware to handle JSON requests and URLendcoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// definition of the routes
app.use("/api/products", productRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Node API updated");
});

mongoose
  .connect(
    "mongodb+srv://semjasa83:123Admin@atlascluster.5j6egy5.mongodb.net/JoinV3_db?retryWrites=true&w=majority&appName=AtlasCluster"
  )
  .then(() => {
    console.log("Connected to the database!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
