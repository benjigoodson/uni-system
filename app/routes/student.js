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

    controller.getAll(function(err, students) {

        if(err) {
            console.log("Error: " + err);
            res.status(500).json({success:false, message: err});
            return;
        }

        res.send(students);

    });

})

router.route('/:student_id')

    // Get a unique student
    .get(function(req, res) {

        var id = req.params.student_id;
        console.log("Requested: GET - /api/student/" + id);

        // Get student by the id passed
        controller.get(id, function(err, student) {
            if(err) {
                console.log("Error: " + err);
                res.status(500).json({success:false, message: err});
                return;
            }

            // return the student
            res.json(student);
        });

    })

module.exports = router;