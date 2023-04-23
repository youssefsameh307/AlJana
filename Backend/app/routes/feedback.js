var express = require('express');
const Feedback = require('../models/feedback/feedback');
var router = express.Router();


const addNewFeedback = async (req,res)=>{
const feedback = req.body.feedback;

Feedback.create(feedback).then((fin)=>{
  res.send({statusCode:200 , data:fin})
}).catch((err)=>{
  res.send({statusCode : err.status, message : err.message})
  console.log(err.status)
});
}

const editFeedback = async function(req,res) {
    await Feedback.findOneAndFeedback({feedbackId:req.params.Id}, req.body.feedback)
    .then((feedback) => {
        res.send({statusCode:200 , data:feedback})
    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)
    })
}

const addResponse = async function(req,res) {
    await Feedback.findOneAndFeedback({feedbackId:req.params.Id}, {response:req.body.response})
    .then((feedback) => {
        res.send({statusCode:200 , data:feedback})
    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)
    })
}

const getAllFeedbacks = async function(req,res) {
    await Feedback.find()
    .then((feedback) => {
        res.send({statusCode:200 , data:feedback})
    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})
}

const getFeedbackByUserId = async function(req,res) {
    await Feedback.find({userId:req.params.Id})
    .then((feedback) => {
        res.send({statusCode:200 , data:feedback})
    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})
}



/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.status(200).json({ message: "ok"});
});


router.post('/', addNewFeedback);

router.get('/all', getAllFeedbacks);

router.get('/:Id', getFeedbackByUserId);

router.patch('/:Id', editFeedback);

router.post('/:Id/respond', addResponse);

module.exports = router;
