// API endpoints for Students
'use strict'

// Imports
var express = require('express');
var controller = require('../controllers/student');

// instance of an express router
var router = express.Router();

// Students api routes

// Get all students
router.route('/').get(function(req, res) {
    console.log("Requested: GET - /api/student");

    // Call controller method to get all students
    controller.getAll(function(err, students) {

        if(err) {
            // Return error to the calling function
            console.log("Error: " + error);
            res.status(500).json({success:false, message: err});
            return;
        }

        // Return the list of students
        res.send(students);

    });

})

router.route('/:student_id')

    // Get a unique student
    .get(function(req, res) {

        // Create query for the passed id
        var id = req.params.student_id;

        console.log("Requested: GET - /api/student/" + id);

        // Get student by the id passed
        controller.get(id, function(err, student) {
            if(err) {
                // Return error to the calling function
                console.log("Error: " + error);
                res.status(500).json({success:false, message: err});
                return;
            }

            // Send the student
            res.json(student);
        });

    })

module.exports = router;