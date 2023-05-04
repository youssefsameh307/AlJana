const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name:{
        type:String, //unique
        required:true,
        unique: true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    nationality:{
        type:String,
        required:true
    },
    idNumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            message: "must be in a valid email format",
            validator: (input) => {
                pattern = /^.+@.+\..+$/i
                return pattern.test(input)
            }
        }
    },
    password:{
        type:String,
        minLength:8,
        required:true
    }
});

const User = mongoose.model('users', usersSchema);
module.exports = User;
