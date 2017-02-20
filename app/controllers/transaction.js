// Transaction controller file
'use strict'

// Import models
var Transaction = require('../models/transaction');

var controller = {};
    
controller.getAll = function getAllTransactions (callback) {

    Transaction.find().lean().exec().then(function transactionFindAll (transactions) {

        callback(undefined, transactions);
    })
    .catch(function errorHandler (error) {
        callback(error);
    })
}

controller.get = function getTransaction (transactionId, callback) {

    var query = {_id : transactionId};

    transaction.findOne(query).lean().exec().then(function transactionFindOne (transaction) {

        callback(undefined, transaction);
    })
    .catch(function errorHandler (error) {
        callback(error);
    })
}

module.exports = controller;