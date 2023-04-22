var express = require('express');
const Schedule = require('../models/schedule/Schedule');
var router = express.Router();


const addNewSchedule = async (req,res)=>{
const schedule = req.body.schedule;
const newTimings = schedule.timings.map(element => {
    if(element && element.includes(":"))
    return "1000-10-10T"+element+":00.000Z";
    else return null
});
const {timings,...rest} = schedule;
const newSchedule = {timings:newTimings,...rest}
console.log(newTimings);

Schedule.create(newSchedule).then((fin)=>{
  res.send({statusCode:200 , data:fin})
}).catch((err)=>{
  res.send({statusCode : err.status, message : err.message})
  console.log(err.status)
});
}

const editSchedule = async function(req,res) {
    await Schedule.findOneAndUpdate({userId:Id},req.body.schedule)
    .then((schedule) => {
        res.send({statusCode:200 , data:schedule})
    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)
    })
}

const getAllSchedules = async function(req,res) {
    await Schedule.find()
    .then((schedule) => {
        res.send({statusCode:200 , data:schedule})
    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})
}

const getScheduleByUserId = async function(req,res) {
    await Schedule.find({userId:req.params.Id})
    .then((schedule) => {
        res.send({statusCode:200 , data:schedule})
    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})
}



/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.status(200).json({ message: "ok"});
});


router.post('/', addNewSchedule);

router.get('/all', getAllSchedules);

router.get('/:Id', getScheduleByUserId)

router.patch('/:Id', editSchedule)


module.exports = router;
