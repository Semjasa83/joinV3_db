const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.route.js");
const contactRoutes = require("./routes/contact.route.js");
const cors = require("cors");
const app = express();

// Middleware to handle CORS
app.use(cors());

// Middleware to handle JSON requests and URLendcoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importieren und initialisieren Sie Socket.IO
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
});

// Mongoose-Verbindung
mongoose
  .connect(
    "mongodb+srv://semjasa83:123Admin@atlascluster.5j6egy5.mongodb.net/JoinV3_db?retryWrites=true&w=majority&appName=AtlasCluster"
  )
  .then(() => {
    console.log("Connected to the database!");

    // Socket.IO-Verbindung
    io.on('connection', (socket) => {
      console.log('Ein Benutzer ist verbunden');
      
      socket.on('disconnect', () => {
        console.log('Benutzer getrennt');
      });
      
      // Weitere Ereignisse hier definieren
    });

    // Server starten
    const PORT = process.env.PORT || 3000;
    http.listen(PORT, () => {
      console.log(`Server läuft auf Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error", err);
  });

// definition of the routes
app.use("/api/products", productRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Node API updated");
});

const corsOptions = {
  origin: 'localhost:4200',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

