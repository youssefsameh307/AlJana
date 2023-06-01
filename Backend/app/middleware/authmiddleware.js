require("dotenv").config();
const admin = require("../config/firebase-config");
var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const logger = require("./logger");
const access_token = process.env.ACCESS_TOKEN_SECRET;

async function verifyToken(req, res, next) {
  const full_token = req.headers["authorization"];
  if (!full_token) {
    // Redirect to login page if token is missing
    return onTokenFailure(req, res, next);
  }
  const token = full_token.split(" ")[1]; // Bearer <token> (split on space
  // try {
  const decoded = await admin.auth().verifyIdToken(token);
  req.user = decoded; // There is always a user
  logger.info("decoded:", decoded);
  next();
  // } catch (err) {
  //   logger.error(err);
  //   onTokenFailure(req, res, next);
  // }
}

function onTokenFailure(req, res, next) {
  res.send({ statusCode: 403, error: "not logged in" });
}

module.exports = verifyToken;
