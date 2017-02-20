// Shop controller file
'use strict'

// Import models
var Shop = require('../models/shop');

var controller = {};
    
controller.getAll = function getAllShops (callback) {

    Shop.find().lean().exec().then(function shopFindAll (shops) {

        callback(undefined, shops);
    })
    .catch(function errorHandler (error) {
        callback(error);
    })
}

controller.get = function getShop (shopId, callback) {

    var query = {_id : shopId};

    Shop.findOne(query).lean().exec().then(function shopFindOne (shop) {

        callback(undefined, shop);
    })
    .catch(function errorHandler (error) {
        callback(error);
    })
}

module.exports = controller;