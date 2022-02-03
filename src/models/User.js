'use strict';
let Model = require('./');

module.exports = Model.extend({
  tableName: 'users',

  hasTimestamps: [
     'created_at',
     'updated_at'
  ],
});
