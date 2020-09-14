const Transaction = require('../models/Transaction');
const helper = require('./transactionHelper');

exports.getTransaction = async (req, res, next) => {
    try {
        const transaction = await helper.getTransactionById(req.params.uid);

        if (!transaction) {
            return helper.handleNotFound(res);
        }

        return helper.handleSuccess(transaction, res);
    } catch (err) {
       return helper.handleThrownErrors(err, res);
    }
};

exports.createTransaction = async (req, res, next) => {
    try {
        const duplicates = await helper.checkDuplicates(req.body);

        if (duplicates.length > 0) {
            return res.status(400).json({success: false, error: duplicates});
        }

        const newTransaction = await Transaction.create(req.body);
        const message = {id: newTransaction.id, success: true};

        return helper.handleSuccess(message, res);
    } catch (err) {
        return helper.handleThrownErrors(err, res);
    }
};

exports.updateTransaction = async (req, res, next) => {
    try {
        const transaction = await helper.getTransactionById(req.body.id);

        if (!transaction) {
           return helper.handleNotFound(res);
        }

        await transaction.updateOne(req.body, {runValidators: true});

        return helper.handleSuccess('resource updated successfully', res);
    } catch (err) {
        return helper.handleThrownErrors(err, res);
    }
};

exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await helper.getTransactionById(req.params.uid);

        if (!transaction) {
            return helper.handleNotFound(res);
        }

        await transaction.remove();

        return helper.handleSuccess('resource deleted successfully', res);
    } catch (err) {
        helper.handleThrownErrors(err, res);
    }
};

