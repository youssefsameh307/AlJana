const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const updateSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:true,
    },
    date:{
        type:Date,
        required:true
    },
    content:{
        type:String,
        required:true,
    },

});

const User = mongoose.model('update', updateSchema);
module.exports = User;
