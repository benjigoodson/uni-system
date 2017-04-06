// Using server.js as our main file

// Import modules
var express = require('express');
var mongoose = require('mongoose');

//////////////// Database setup ////////////////

// Set the promises used by mongoose
mongoose.Promise = global.Promise;

// Database config values
var db = require('./app/config/db');

// Connect to our Mongo database
console.log('Connecting to database...   ' + db.uri);

// If no database connection string is set
if(!db.uri) {
  // Display an error and end the application
  console.error("No database connection string set.");
  return;
}

// Connect to the database
mongoose.connect(db.uri);

//////////////// Application setup ////////////////

// Set port and ip, if arguments are passed to the application use those
var server_port = process.env.SERVICE_PORT || 2500;
var server_ip = process.env.SERVICE_IP || '127.0.0.1';

// Create an insatnce of an express application
var app = express();

// Register routes
require('./app/routes')(app);

// Get local IP
var ip = require("ip");

// This library gets the local ip address of the machine
server_ip = ip.address();

// Start listening on the server port 
app.listen(server_port, function () {
  console.log("Listening on " + server_ip + ", port " + server_port )
});

// expose app
exports = module.exports = app;