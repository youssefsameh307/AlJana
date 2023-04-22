const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:true,
    },
    timings:{
        type:Array,
        required:true,
        default:[Date],
        length:7,
        validate: {
            message: "type must be time",
            validator: (input) => {
                // console.log("val start");
                // if(!input){
                //     return true
                // }
                // console.log(input)
                // console.log(/^[0-2][0-9]:[0-6][0-9]$/.test(input));

                // if (!(/^[0-2][0-9]:[0-6][0-9]$/.test(input)))
                // return false

                // const hours = time.split(":")[0];
                // const minutes = time.split(":")[1];
                // console.log(hours+":"+minutes);

                return !Object.values(input).some((x)=> !x instanceof Date) 
            }
        }
    },
    price:{
        type:Number,
        required:true,
    },
    startDate:{ 
        type:Date,
        required:true
    },
    syndicate:{ 
        type:String,
        required:false
    }

});

const User = mongoose.model('schedule', scheduleSchema);
module.exports = User;
