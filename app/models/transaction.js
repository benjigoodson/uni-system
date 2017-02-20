// transaction model file

// require the mongoose module
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

// define our transaction model
var transactionSchema = new Schema({
    shopName : { 
        type : String,
        required : true 
    },
    shopId : {
        type : String,
        required : true
    },
    type : { 
        type : String,
        required : true
    },
    products : { 
        type : Array, 
        default : [] 
    },
    price : { 
        type : Number,
        required : true
    }
},
{ 
    collection : "transaction" 
});


// use module exports so it can be used my other files
module.exports = mongoose.model("transaction", transactionSchema);