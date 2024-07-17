require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contact.route.js");
const cors = require("cors");
const app = express();
const http = require('http').Server(app);

// Import Socket.IO and separate logic
const { setupSocketIO } = require('./socket');

// Middleware to handle CORS
const corsOptions = {
  origin: 'http://localhost:4200', // Adjust according to your environment
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

// Middleware to handle JSON requests and URLencoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Validate environment variables
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined.");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

// Mongoose connection with async/await
async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to the database!");

    // Setup Socket.IO
    setupSocketIO(http);

    // Server start
    http.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Database connection error", err);
    process.exit(1);
  }
}

startServer();

// Definition of the routes
app.use("/api/contacts", contactRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the http instance for use in other modules if necessary
module.exports = { http };