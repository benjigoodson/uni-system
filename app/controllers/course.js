// Course controller file
'use strict'

// Import models
var Course = require('../models/course');
var Student = require('../models/student');

var controller = {};
    
controller.getAll = function getAllCourses (callback) {

    Course.find().lean().exec().then(function courseFindAll (courses) {

        callback(undefined, courses);
    })
    .catch(function errorHandler (error) {
        callback(error);
    })
}

controller.get = function getCourse (courseId, callback) {

    var query = {_id : courseId};

    Course.findOne(query).lean().exec().then(function courseFindOne (course) {

        callback(undefined, course);
    })
    .catch(function errorHandler (error) {
        callback(error);
    })
}

controller.getFull = function getCourseWithFullStudents (courseId, callback) {

    var query = { _id : courseId };

    Course.findOne(query).lean().exec().then(function courseFindOne (course) {

        var countPromises = [];

        var fullStudents = [];

        // Get each student details
        course.students.forEach(function (basicStudent, i) {

            var student_id = basicStudent.id;

            countPromises.push(Student.findOne({_id : student_id }).lean().exec().then(function studentFindOne (student) {
                
                fullStudents.push(student);

            }));

        });

        Promise.all(countPromises).then(function completedPromises () {

            course.students = fullStudents;

            callback(undefined, course);   
        })
    })
    .catch(function errorHandler (error) {
        callback(error);
    })
}

module.exports = controller;