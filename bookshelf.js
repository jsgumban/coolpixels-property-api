'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require('./config/database');
const knex = require('knex')(config);

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
