// API endpoints for Courses
'use strict'

// Imports
var express = require('express');
var controller = require('../controllers/course');

// instance of an express router
var router = express.Router();

// Courses api routes
// Get all courses
router.route('/').get(function(req, res) {
    console.log("Requested: GET - /api/course");

    controller.getAll(function(err, courses) {

        if(err) {
            console.log("Error: " + err);
            res.status(500).json({success:false, message: err});
            return;
        }

        res.send(courses);

    });

})

router.route('/:course_id')

    // Get a unique course
    .get(function(req, res) {

        var id = req.params.course_id;
        console.log("Requested: GET - /api/course/" + id);

        // Get course by the id passed
        controller.get(id, function(err, course) {
            if(err) {
                console.log("Error: " + err);
                res.status(500).json({success:false, message: err});
                return;
            }

            // return the course
            res.json(course);
        });

    })

router.route('/full/:course_id')

    // Get a unique course
    .get(function(req, res) {

        var id = req.params.course_id;
        console.log("Requested: GET - /api/course/full/" + id);

        // Get course by the id passed
        controller.getFull(id, function(err, course) {
            if(err) {
                console.log("Error: " + err);
                res.status(500).json({success:false, message: err});
                return;
            }

            // return the course and full student details
            res.json(course);
        });

    })

module.exports = router;