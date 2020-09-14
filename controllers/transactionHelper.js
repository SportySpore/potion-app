const Transaction = require('../models/Transaction');

async function getTransactionById(id) {
    return await Transaction.findById(id).catch(() => null);
}

async function checkDuplicates(body) {
    if (!body) {
        return [];
    }
    const transactions = await Transaction.find({
        $or: [
            {email: body.email},
            {phone: body.phone},
            {firstName: body.firstName, lastName: body.lastName},
            {'payment.ccNum': body.payment ? body.payment.ccNum : ''}
        ]
    });

    const errors = [];
    transactions.forEach((t) => {
        if (t.email === body.email) {
            errors.push('A customer with the same email already exists!');
        }
        if (t.phone === body.phone) {
            errors.push('A customer with the same phone number already exists!');
        }
        if (t.firstName === body.firstName && t.lastName === body.lastName) {
            errors.push('A customer with the same name already exists!');
        }
        if (body.payment && t.payment.ccNum === body.payment.ccNum) {
            errors.push('A customer with the same credit card information already exists!')
        }
    });

    return errors;
}

function handleSuccess(message, res) {
    if (typeof message === 'string') {
        return res.status(200).json({success: true, message: message});
    }
    return res.status(200).json(message);
}

function handleThrownErrors(err, res) {
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ success: false, error: messages});
    } else if (err.name === 'CastError') {
        return res.status(400).json({ success: false, error: err.message});
    } else {
        return res.status(500).json({success: false, error: `Server Error: ${err.toLocaleString()}`});
    }
}

function handleNotFound(res) {
    return res.status(404).json({success: false, error: 'resource not found'});
}

module.exports = {
    getTransactionById,
    checkDuplicates,
    handleSuccess,
    handleNotFound,
    handleThrownErrors
}