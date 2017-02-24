// Student model file

// require the mongoose module
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

// define our student model
var StudentSchema = new Schema({
    name : { 
        type : String,
        required : true 
    },
    age : {
        type : Number,
        required : true
    },
    gender : { 
        type : String, 
        default : 'MALE' 
    }
},
{ 
    collection : "student" 
});


// use module exports so it can be used my other files
module.exports = mongoose.model("Student", StudentSchema);