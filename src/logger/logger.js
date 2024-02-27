const { createLogger, format, transports } = require("winston");

const currentDate =
  new Date().getDate() +
  "-" +
  (parseInt(new Date().getMonth()) + 1) +
  "-" +
  new Date().getFullYear();
  
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  // defaultMeta: { service: "logger" },
  transports: [
    new transports.File({
      filename: "logs/" + currentDate + "/error.log",
      level: "error",
    }),
    new transports.File({ filename: "logs/" + currentDate + "/combine.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

module.exports = logger;
