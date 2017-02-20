// API endpoints for Transactions
'use strict'

// Imports
var express = require('express');
var controller = require('../controllers/transaction');

// instance of an express router
var router = express.Router();

// Transactions api routes
// Get all transactions
router.route('/').get(function(req, res) {
    console.log("Requested: GET - /api/transaction");

    controller.getAll(function(err, transactions) {

        if(err) {
            console.log("Error: " + err);
            res.status(500).json({success:false, message: err});
            return;
        }

        res.send(transactions);

    });

})

router.route('/:transaction_id')

    // Get a unique transaction
    .get(function(req, res) {

        var id = req.params.transaction_id;
        console.log("Requested: GET - /api/transaction/" + id);

        // Get transaction by the id passed
        controller.get(id, function(err, transaction) {
            if(err) {
                console.log("Error: " + err);
                res.status(500).json({success:false, message: err});
                return;
            }

            // return the transaction
            res.json(transaction);
        });

    })

module.exports = router;