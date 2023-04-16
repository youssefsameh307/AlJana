const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    nationality:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    picture:{
        type:String,
    },
    motherAge:{
        type:String,
    },
    fatherAge:{
        type:String,
    },
    motherJob:{
        type:String,
    },
    fatherJob:{
        type:String,
    },
    numberOfSiblings:{
        type:Number
    },
    orderInSiblings:{
        type:Number
    }
});

const User = mongoose.model('users', usersSchema);
module.exports = User;
