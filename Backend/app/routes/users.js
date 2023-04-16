var express = require('express');
const User = require('../models/user/User');
const config = require('config');
var router = express.Router();

getAllUsers = async function(req,res) {
  await User.find()
  .then((user) => {
      res.send({statusCode:200 , data:user})
  })
  .catch( (err) => {
      res.send({statusCode : err.status, message : err.message})
      console.log(err.status)})
}

addNewUser = async (req,res)=>{
console.log(req);
User.create(req.body.user).then((fin)=>{
  res.send({statusCode:200 , data:fin})
}).catch((err)=>{
  res.send({statusCode : err.status, message : err.message})
  console.log(err.status)
});
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.status(200).json({ message: "ok"});
});

router.get('/all', getAllUsers);

router.post('/', addNewUser);


module.exports = router;
