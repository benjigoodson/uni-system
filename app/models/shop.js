// shop model file

// require the mongoose module
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

// define our shop model
var ShopSchema = new Schema({
    name : { 
        type : String,
        required : true 
    },
    location : {
        type : String,
        required : true
    },
    numStaff : { 
        type : Number, 
        default : '' 
    },
    products : { 
        type : Array, 
        default : [] 
    }
},
{ 
    collection : "shop" 
});


// use module exports so it can be used my other files
module.exports = mongoose.model("Shop", ShopSchema);