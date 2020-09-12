const mongoose = require('mongoose');

const connect = async () => {
    try {
        if (process.env.NODE_ENV === 'test') {
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage().then(() => mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }));
        } else {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });

            console.log(`MongoDB Connected: ${conn.connection.host}`);
        }
    } catch (err) {
        console.log('cant connect');
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