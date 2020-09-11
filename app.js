const express = require('express');
const cors = require('cors');
const path = require('path');
const conn = require('./config/db');

conn.connect();

const magic = require('./routes/magic');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/magic', magic);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

module.exports = app;