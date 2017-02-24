// Student controller file
'use strict'

// Import models
var Student = require('../models/student');

var controller = {};
    
controller.getAll = function getAllStudents (callback) {

    Student.find().lean().exec().then(function studentFindAll (students) {

        callback(undefined, students);
    })
    .catch(function errorHandler (error) {
        callback(error);
    })
}

controller.get = function getStudent (studentId, callback) {

    var query = {_id : studentId};

    Student.findOne(query).lean().exec().then(function studentFindOne (student) {

        callback(undefined, student);
    })
    .catch(function errorHandler (error) {
        callback(error);
    })
}

module.exports = controller;