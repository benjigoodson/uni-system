// Course model file

// require the mongoose module
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

// define our course model
var CourseSchema = new Schema({
    name : { 
        type : String,
        required : true 
    },
    campus : {
        type : String,
        required : true
    },
    students : { 
        type : Array, 
        default : [] 
    }
},
{ 
    collection : "course" 
});


// use module exports so it can be used my other files
module.exports = mongoose.model("Course", CourseSchema);