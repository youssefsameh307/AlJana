require("dotenv").config();
var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const access_token = process.env.ACCESS_TOKEN_SECRET;
// ! TODO Make real authentication
const tickets = {
  user1: [
    {
        id: 1,
        title: "ticket 1",
    },
    {
        id: 2,
        title: "ticket 2",
    },
  ],
  user2: {
    id: 3,
    title: "ticket 3",
  },
  user3: {
    id: 4,
    title: "ticket 4",
  },
};

//#region user tickets
router.get("/", function (req, res, next) {
    
});

module.exports = router;
