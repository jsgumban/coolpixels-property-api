'use strict';
let Model = require('./');

module.exports = Model.extend({
  tableName: 'clients',

  hasTimestamps: [
     'created_at',
     'updated_at'
  ],
});
