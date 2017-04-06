// Course controller file
'use strict'

// Import models
var Course = require('../models/course');
var Student = require('../models/student');

var controller = {};
    
controller.getAll = function getAllCourses (callback) {

    // Database query to get all courses
    Course.find().lean().exec().then(function courseFindAll (courses) {

        // Return the list courses
        callback(undefined, courses);
        return;
    })
    .catch(function errorHandler (error) {
        // Return error to the calling function
        console.log("Error: " + error);
        callback(error);
    })
}

controller.get = function getCourse (courseId, callback) {

    // Create the query
    var query = {_id : courseId};

    // Database query to get a course based on a passed id
    Course.findOne(query).lean().exec().then(function courseFindOne (course) {

        // Return the student
        callback(undefined, course);
        return;
    })
    .catch(function errorHandler (error) {
        // Return error to the calling function
        console.log("Error: " + error);
        callback(error);
    })
}

controller.getFull = function getCourseWithFullStudents (courseId, callback) {

    // Create the query
    var query = { _id : courseId };

    // Database query to get a course based on a passed id
    Course.findOne(query).lean().exec().then(function courseFindOne (course) {

        // Store an array of promises
        var countPromises = [];

        // Store an array of students
        var fullStudents = [];

        // For each student id
        course.students.forEach(function (basicStudent, i) {

            // Get the student id
            var student_id = basicStudent.id;

            // Database query for finding a student to match the id
            countPromises.push(Student.findOne({_id : student_id }).lean().exec().then(function studentFindOne (student) {
                
                // Add the full student details to the array
                fullStudents.push(student);

            }));

        });

        // When all promises are complete
        Promise.all(countPromises).then(function completedPromises () {

            // set the course's student
            course.students = fullStudents;

            // Return the course
            callback(undefined, course);

            return;
        })
    })
    .catch(function errorHandler (error) {
        // Return error to the calling function
        console.log("Error: " + error);
        callback(error);
    })
}

module.exports = controller;