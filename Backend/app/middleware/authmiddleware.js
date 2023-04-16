require("dotenv").config();
var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const access_token = process.env.ACCESS_TOKEN_SECRET;

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  
  if (!token) {
    // Redirect to login page if token is missing
    return onTokenFailure(req, res, next);
  }

  try {
    const decoded = jwt.verify(token, access_token);
    req.user = decoded;
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
