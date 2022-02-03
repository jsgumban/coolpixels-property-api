'use strict';
let Model = require('./');

module.exports = Model.extend({
  tableName: 'properties',
  
  expenses: function () {
    const Expense = require('./Expense');
    return this.hasMany(Expense, 'property_id');
  },
  
  incomes: function () {
    const Income = require('./Income');
    return this.hasMany(Income, 'property_id');
  },
});
