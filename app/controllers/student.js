// Student controller file
'use strict'

// Import models
var Student = require('../models/student');

var controller = {};
    
controller.getAll = function getAllStudents (callback) {

    // Database query to get all students
    Student.find().lean().exec().then(function studentFindAll (students) {

        // Return the list of students
        callback(undefined, students);
        return;
    })
    .catch(function errorHandler (error) {
        // Return error to the calling function
        console.log("Error: " + error);
        callback(error);
    })
}

controller.get = function getStudent (studentId, callback) {

    // Create the query
    var query = {_id : studentId};

    // Database query to get a student based on a passed id
    Student.findOne(query).lean().exec().then(function studentFindOne (student) {

        // Return the student
        callback(undefined, student);
        return;
    })
    .catch(function errorHandler (error) {
        // Return error to the calling function
        console.log("Error: " + error);
        callback(error);
    })
}

module.exports = controller;