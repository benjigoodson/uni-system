// API endpoints for Athuentication
'use strict'

// Imports
var express = require('express');

module.exports = function (app) {

    app.use(function(req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

        // Headers to allow
        res.setHeader('Access-Control-Allow-Headers', '*, authorization');

        // Allow senidng of cookies for sessions etc
        res.setHeader('Access-Control-Allow-Credentials', true);

        next();

    });
}