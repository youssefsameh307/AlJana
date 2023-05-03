require("dotenv").config();
var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const config = require('config')
const access_token = config.ACCESS_TOKEN_SECRET;

function verifyToken(req, res, next) {

  const token = req.headers["authorization"];
  if (!token) {
    // Redirect to login page if token is missing
    return onTokenFailure(req, res, next);
  }

  try {
    console.log(access_token)
    const decoded = jwt.verify(token, access_token.split(" ")[1]);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    onTokenFailure(req, res, next);
  }
}

function onTokenFailure(req, res, next) {
  res.send({statusCode:403 , error:"not logged in"})
}

module.exports = verifyToken;
