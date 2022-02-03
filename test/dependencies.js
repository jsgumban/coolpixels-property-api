'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const knexFile = require('../knexfile').test;
const knex = require('knex')(knexFile);
const nock = require('nock');
const seeds = require('../seeds/index');

chai.use(chaiAsPromised);

require('../src');

global.expect = chai.expect;
global.stub = sinon.stub;
global.mock = sinon.mock;
global.nock = nock;

global.seeds = function() {
   return knex.seed.run(seeds);
};

global.migrate = function() {
   return knex.migrate.latest(knexFile).catch(err => {
      console.log('migrate-error: ', err);
   })
};

global.rollback = function() {
   return knex.migrate.rollback(knexFile).catch(err => {
      console.log('rollback-error: ', err);
   });
};

