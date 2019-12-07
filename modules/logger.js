//module for winston logger
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //log-files
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'logs/http.log', level: 'http' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});
//make module visible for request
module.exports.logger = logger;