require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 1000,
    MONGO_URI: process.env.MONGO_URI || 'ENTER HERE',
    NODE_ENV: process.env.NODE_ENV || 'development'
};