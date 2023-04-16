//#region : imports
var createError = require("http-errors");
var express = require("express");
var path = require("path");
const { MongoClient, ServerApiVersion } = require('mongodb');

var defaultLogger = require("morgan");
let expresWinston = require("express-winston");
let authmiddleware = require("./middleware/authmiddleware.js");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let userLogin = require("./routes/userLogin.js");
let userTickets = require("./routes/userTickets.js");

const mongoose = require('mongoose');

var cookieParser = require("cookie-parser");
const config = require('config');
const cors = require('cors');
//#endregion
const MongoURI =  config.get('mongoURI');
//#region : app setup
var app = express();
const port = process.env.PORT || "8000";



const client = new MongoClient(MongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function main() {
  await mongoose.connect(MongoURI);
}


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    main();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(defaultLogger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



//#endregion
//#region : Logger
const winston = require("winston");

const logger = require("./middleware/logger.js");

// set up logger before routes
app.use(
  expresWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);
//#endregion
//#region : routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", userLogin);
app.use("/tickets", authmiddleware, userTickets);
//#endregion
//#region : error handling
// internal error logging
app.use(
  expresWinston.errorLogger({
    transports: [
      new winston.transports.File({
        filename: "logs/internal_errors.log",
      }),
    ],
    format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint()),
  })
);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
//#endregion



app.listen(port, () => {console.log(`Listening to requests on http://localhost:${port}`)})

module.exports = app;
