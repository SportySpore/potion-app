const express = require('express');
const cors = require('cors');
const conn = require('./config/db');

conn.connect();

const magic = require('./routes/magic');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/magic', magic);

module.exports = app;