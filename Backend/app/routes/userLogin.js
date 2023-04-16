require('dotenv').config();
var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
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
router.post("/", function (req, res, next) {
  // authenticate user
  const { username, password } = req.body;
  if (users[username]) {
    if (users[username].password === password) {
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      const payload = { id: users[username].id };
      const token = jwt.sign(payload, access_token);
      res.json({ message: "ok", token: token });
    } else {
      res.status(401).json({ error_message: "passwords did not match" });
    }
  } else {
    res.status(401).json({ error_message: "no such user found" });
  }
});


module.exports = router;
