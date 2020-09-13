const mongoose = require('mongoose');
const { NODE_ENV, MONGO_URI } = require('./index.js');


const connect = async () => {
    try {
        // Mock DB for Testing Environment
        if (NODE_ENV === 'test') {
            const { Mockgoose } = require('mockgoose');
            const mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage().then(() => mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }));
        } else {
            const conn = await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });

            console.log(`MongoDB Connected: ${conn.connection.host}`);
        }
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

const close = async () => {
    return await mongoose.disconnect();
}

module.exports = {
    connect,
    close
};