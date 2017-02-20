// API endpoints for Shops
'use strict'

// Imports
var express = require('express');
var controller = require('../controllers/shop');

// instance of an express router
var router = express.Router();

// Shops api routes
// Get all shops
router.route('/').get(function(req, res) {
    console.log("Requested: GET - /api/shop");

    controller.getAll(function(err, shops) {

        if(err) {
            console.log("Error: " + err);
            res.status(500).json({success:false, message: err});
            return;
        }

        res.send(shops);

    });

})

router.route('/:shop_id')

    // Get a unique shop
    .get(function(req, res) {

        var id = req.params.shop_id;
        console.log("Requested: GET - /api/shop/" + id);

        // Get shop by the id passed
        controller.get(id, function(err, shop) {
            if(err) {
                console.log("Error: " + err);
                res.status(500).json({success:false, message: err});
                return;
            }

            // return the shop
            res.json(shop);
        });

    })

module.exports = router;