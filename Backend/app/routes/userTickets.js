require("dotenv").config();
var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const logger = require("../middleware/logger");
const access_token = process.env.ACCESS_TOKEN_SECRET;
// ! TODO Make real authentication
const tickets = {
  "kiIjrP1Fg1gwZ2LwnaErXpvf2O22": [
    {
      id: 1,
      title: "title1",
    },
    {
      id: 2,
      title: "title2",
    },
  ],
};

//#region user tickets
router.get("/", function (req, res, next) {
  // User is already authenticated and all user data is in the req.user object
  let user = req.user;
  logger.info("User: " + JSON.stringify(user) )
  let userTickets = tickets[user.user_id];
  logger.info("User Tickets: " + userTickets + " for user: " + JSON.stringify(user) )
  // // send the tickets
  res.status(200).json({'tickets': userTickets});
});
//#endregion
module.exports = router;
