const express = require('express');
const router = express.Router();
const { getTransaction, createTransaction, deleteTransaction, updateTransaction } = require('../controllers/transaction');

router
    .route('/')
    .patch(updateTransaction)
    .post(createTransaction);

router
    .route('/:uid')
    .delete(deleteTransaction)
    .get(getTransaction)

module.exports = router;