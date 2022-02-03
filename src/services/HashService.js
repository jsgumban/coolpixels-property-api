'use strict';

let bcrypt = require('bcrypt');

const ROUND_COUNT = process.env.ROUND_COUNT || 10;

class HashService {

  static getInstance() {
    return new HashService();
  }

  static execute(text) {
    return bcrypt.hashSync(text, ROUND_COUNT);
  }

  static compare(text='', password='') {
    return bcrypt.compareSync(text, password);
  }
};

module.exports = HashService;
