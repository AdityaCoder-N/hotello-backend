const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();


app.use(cors());
app.use(express.json());

module.exports = app;