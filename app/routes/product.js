// API endpoints for Products
'use strict'

// Imports
var express = require('express');
var controller = require('../controllers/product');

// instance of an express router
var router = express.Router();

// Products api routes
// Get all products
router.route('/').get(function(req, res) {
    console.log("Requested: GET - /api/product");

    controller.getAll(function(err, products) {

        if(err) {
            console.log("Error: " + err);
            res.status(500).json({success:false, message: err});
            return;
        }

        res.send(products);

    });

})

router.route('/:product_id')

    // Get a unique product
    .get(function(req, res) {

        var id = req.params.product_id;
        console.log("Requested: GET - /api/product/" + id);

        // Get product by the id passed
        controller.get(id, function(err, product) {
            if(err) {
                console.log("Error: " + err);
                res.status(500).json({success:false, message: err});
                return;
            }

            // return the product
            res.json(product);
        });

    })

module.exports = router;