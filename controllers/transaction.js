const Transaction = require('../models/Transaction');

exports.getTransaction = async (req, res, next) => {
    try {
        const transaction = await getTransactionById(req.params.uid);

        if (!transaction) {
            return res.status(404).json({ success: false, error: 'resource not found' });
        }

        return res.status(200).json(transaction);
    } catch (err) {
        return res.status(500).json({ success: false, error: 'Server Error' });
    }
}

exports.createTransaction = async (req, res, next) => {
    try {
        const duplicates = await getDuplicates(req.body);

        if (duplicates.length > 0) {
            return res.status(400).json({ success: false, error: 'A customer with the same information already exists'});
        }

        const newTransaction = await Transaction.create(req.body).catch((err) => {throw (err)});

        return res.status(201).json({ success: true, id: newTransaction.id });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages});
        }

        return res.status(500).json({ success: false, error: err });
    }
}

exports.updateTransaction = async (req, res, next) => {
    try {
        const transaction = await getTransactionById(req.body.id);

        if (!transaction) {
            return res.status(404).json({ success: false, error: 'resource not found' });
        }

        await transaction.updateOne(req.body);

        return res.status(200).json({ success: true, message: 'resource updated successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, error: 'Server Error' });
    }
}

exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await getTransactionById(req.params.uid);

        if (!transaction) {
            return res.status(404).json({ success: false, error: 'resource not found' });
        }

        await transaction.remove();

        return res.status(200).json({ success: true, message: 'resource deleted successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, error: 'Server Error' });
    }
}

async function getTransactionById(id) {
    return await Transaction.findById(id).catch(() => null);
}

async function getDuplicates(body) {
    if (!body) {
        return [];
    }
    return await Transaction.find({
        $or: [
            {email: body.email},
            {firstName: body.firstName, lastName: body.lastName},
            {ccNum: body.ccNum, exp: body.exp},
            {phone: body.phone}
        ]
    });
}

