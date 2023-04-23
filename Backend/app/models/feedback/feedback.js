const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    updateId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'update',
        required:true,
    },
    response:{
        type:String,
        required:false,
    }
    
});

const Feedback = mongoose.model('feedback', feedbackSchema);
module.exports = Feedback;
