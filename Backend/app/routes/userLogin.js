require('dotenv').config();
var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const User = require('../models/user/User');
const config = require('config');
const access_token = process.env.ACCESS_TOKEN_SECRET;
// ! TODO Make real authentication 
const users = {
  'user1': {
    username: "user1",
    id: 1,
    password: "user1",
  },
  'user2': {
    username: "user2",
    id: 2,
    password: "user2",
  },
  'user3': {
    username: "user3",
    id: 3,
    password: "user3",
  },
};
/* login user. */
router.post("/", async function (req, res, next) {
  // authenticate user
  const { username, password } = req.body;
  const user = await User.findOne({name:username})
  console.log(user);
  console.log(password);
  if (user) {
    if (user.password === password) {
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      const payload = { id: user.id };
      const token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET);
      res.json({ message: "ok", token: token });
    } else {
      res.status(401).json({ error_message: "passwords did not match" });
      return; 
    }
  } else {
    res.status(401).json({ error_message: "no such user found" });
    return;
  }
});


module.exports = router;
