require("dotenv").config();
var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const logger = require("./logger");
const access_token = process.env.ACCESS_TOKEN_SECRET;

function verifyToken(req, res, next) {
  const full_token = req.headers["authorization"];
  if (!full_token) {
    // Redirect to login page if token is missing
    return onTokenFailure(req, res, next);
  }
  const token = full_token.split(' ')[1]; // Bearer <token> (split on space
  logger.info("Token: " + token);
  
  

  try {
    const decoded = jwt.verify(token, access_token);
    req.user = decoded; // There is always a user 
    next();
  } catch (err) {
    // Redirect to login page if token is invalid
    onTokenFailure(req, res, next);
  }
}

function onTokenFailure(req, res, next) {
  res.redirect("/login");
}

module.exports = verifyToken;
