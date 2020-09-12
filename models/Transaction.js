const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a First Name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a Last Name']
    },
    email: {
        type: String,
        required: [true, 'Please add an Email Address'],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    address: {
        street1: {
            type: String,
            required: [true, 'Please add a Street']
        },
        street2: String,
        city: {
            type: String,
            required: [true, 'Please add a City']
        },
        state: {
            type: String,
            required: [true, 'Please add a State']
        },
        zip: {
            type: String,
            required: [true, 'Please add a Zip Code'],
            maxLength: 5
        }
    },
    phone: {
        type: String,
        required: [true, 'Please add a Phone Number']
    },
    payment: {
        ccNum: {
            type: String,
            required: [true, 'Please add a Credit Card Number']
        },
        exp: {
            type: String,
            required: [true, 'Please add an Expiration Date in MM/YY format']
        },
    },
    quantity: {
        type: Number,
        min: 1,
        max: 3,
        required: [true, 'Please add a Quantity between 1 - 3']
    },
    total: {
        type: String,
        required: [true, 'Please add a Total']
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    fulfilled: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('Transaction', TransactionSchema);


