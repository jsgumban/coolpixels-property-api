'use strict'

let dotenv = require('dotenv');
dotenv.config();

let config = require('./config/database');

module.exports = {

  development: config,

  test: config,

  staging: config,

  production: config
}
