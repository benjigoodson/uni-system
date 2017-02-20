// product model file

// require the mongoose module
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

// define our product model
var productSchema = new Schema({
    name : { 
        type : String,
        required : true 
    },
    price : {
        type : Number,
        required : true
    }
},
{ 
    collection : "product" 
});


// use module exports so it can be used my other files
module.exports = mongoose.model("product", productSchema);