const express = require('express')
const mongoose = require('mongoose');
const app = express();



app.get('/', (req, res) => {
    res.send('Hello from Node API updated');
})

mongoose.connect('mongodb+srv://semjasa83:123Admin@atlascluster.5j6egy5.mongodb.net/JoinV3_db?retryWrites=true&w=majority&appName=AtlasCluster')
    .then(() => {
        console.log('Connected to the database!');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(() => {
        console.log('Connection failed!');
    });

/*
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to the database!");
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});*/
