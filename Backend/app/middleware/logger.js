const winston = require("winston");
const { createLogger, format, transports } = winston;
require("winston-mongodb");


const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.metadata(),
    format.prettyPrint(),
    format.colorize()
  ),
  transports: [
    new transports.Console(), // prints to console
    new transports.File({
      filename: "logs/warn-error.log",
      level: "warn",
    }), // log warnings 
    new transports.File({
      filename: "logs/app-errors.log",
      level: "error",
    }), // log errors

    //#region : MongoDB logs
    // new transports.MongoDB({
    //   level: "info",
    //   db: "mongodb://localhost:27017/myproject",
    //   collection: "logs",
    //   options: { useUnifiedTopology: true },
    // }),
    //#endregion
  ],

});


module.exports = logger;
