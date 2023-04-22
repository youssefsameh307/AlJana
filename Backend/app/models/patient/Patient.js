const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientsSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:true,
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

const User = mongoose.model('patients', patientsSchema);
module.exports = User;
