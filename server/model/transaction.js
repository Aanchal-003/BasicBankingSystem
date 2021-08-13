const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Transaction = mongoose.model('Transaction',transactionSchema);

module.exports = Transaction;