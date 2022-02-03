'use strict'

let winston = require('winston');
let morgan = require('morgan');

winston.remove(winston.transports.Console);
winston.add(new winston.transports.File({ filename: 'logs.log' }));

winston.stream = {
  write: (message, encoding) => {
    winston.info(message);
  }
}


module.exports = winston;
module.exports.morgan = morgan('combined', { stream: winston.stream });
