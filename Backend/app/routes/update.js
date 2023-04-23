var express = require('express');
const Update = require('../models/update/Update');
var router = express.Router();


const addNewUpdate = async (req,res)=>{
const update = req.body.update;

Update.create(update).then((fin)=>{
  res.send({statusCode:200 , data:fin})
}).catch((err)=>{
  res.send({statusCode : err.status, message : err.message})
  console.log(err.status)
});
}

const editUpdate = async function(req,res) {
    await Update.findOneAndUpdate({updateId:req.params.Id}, req.body.update)
    .then((update) => {
        res.send({statusCode:200 , data:update})
    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)
    })
}

const getAllUpdates = async function(req,res) {
    await Update.find()
    .then((update) => {
        res.send({statusCode:200 , data:update})
    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})
}

const getUpdateByUserId = async function(req,res) {
    await Update.find({userId:req.params.Id})
    .then((update) => {
        res.send({statusCode:200 , data:update})
    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})
}



/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.status(200).json({ message: "ok"});
});


router.post('/', addNewUpdate);

router.get('/all', getAllUpdates);

router.get('/:Id', getUpdateByUserId)

router.patch('/:Id', editUpdate)

module.exports = router;
