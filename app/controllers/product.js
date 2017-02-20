// Product controller file
'use strict'

// Import models
var Product = require('../models/product');

var controller = {};
    
controller.getAll = function getAllProducts (callback) {

    Product.find().lean().exec().then(function productFindAll (products) {

        callback(undefined, products);
    })
    .catch(function errorHandler (error) {
        callback(error);
    })
}

controller.get = function getProduct (productId, callback) {

    var query = {_id : productId};

    Product.findOne(query).lean().exec().then(function productFindOne (product) {

        callback(undefined, product);
    })
    .catch(function errorHandler (error) {
        callback(error);
    })
}

module.exports = controller;