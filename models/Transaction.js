const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a First Name'],
        match: [/^[a-zA-Z\s]*$/, 'Invalid First Name format: Letters only']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a Last Name'],
        match: [/^[a-zA-Z\s]*$/, 'Invalid Last Name format: Letters only']
    },
    email: {
        type: String,
        required: [true, 'Please add an Email Address'],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email Address in not in a valid format'],
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
        required: [true, 'Please add a Phone Number'],
        match: [/[0-9]{3}-[0-9]{3}-[0-9]{4}/, 'Phone number is not in the valid format ###-###-####']
    },
    payment: {
        ccNum: {
            type: String,
            required: [true, 'Please add a Credit Card Number']
        },
        exp: {
            type: String,
            required: [true, 'Please add an Expiration Date in MM/YY format'],
            match: [/(?:0[1-9]|1[0-2])\/[0-9]{2}/, 'Expiration Date is not in the valid format MM/YY']
        },
    },
    quantity: {
        type: Number,
        min: [1, 'Quantity is less than the minimum allowed value (1)'],
        max: [3, 'Quantity is more than the maximum allowed value (3)'],
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


