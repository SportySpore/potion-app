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
            required: [true, 'Please add a State'],
            validate: {
                validator: function (v) {
                    return states.includes(v.toUpperCase());
                },
                message: "Invalid Abbreviated State"
            }
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
            required: [true, 'Please add a Credit Card Number'],
            minLength: [13, "The Credit Card Number is too short"],
            match: [/^\d+(?:-\d+)*$/, 'Credit Card Number is not in the valid format: Digits only']
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


const states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];



module.exports = mongoose.model('Transaction', TransactionSchema);


