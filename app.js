const express = require('express');
const cors = require('cors');
const path = require('path');
const {NODE_ENV} = require('./config');

const app = express();

// JSON Middleware
app.use(express.json());

// CORS Middleware
app.use(cors());

// Routers
const magic = require('./routes/magic');

// Use Routes
app.use('/api/magic', magic);

// Serve STATIC assets if in PROD
if (NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

module.exports = app;