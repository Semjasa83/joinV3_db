require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contact.route.js");
const taskRoutes = require("./routes/task.route.js");
const cors = require("cors");
const app = express();


// Middleware to handle CORS
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

// Middleware to handle JSON requests and URLendcoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// definition of the routes
app.use("/api/tasks", taskRoutes);
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

const port = 3000;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to the JoinV3 database!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });