'use strict';

const request = require('supertest');
const app = require(`${process.cwd()}/app`);

describe('POST /auth/register', () => {
   const clientId = 'client_id';
   const clientSecret = 'client_secret';
   const buffer = Buffer.from(`${clientId}:${clientSecret}`);
   const authorization = `Basic ${buffer.toString('base64')}`

   beforeEach(done => {
      migrate().then(() => {
         return seeds();
      }).then(() => {
         done();
      });
   });

   afterEach(done => {
      rollback().then(() => {
         done();
      });
   });

   it('returns a 201 when successful', done => {
      request(app)
         .post('/v1/auth/register')
         .set('Authorization', authorization)
         .send({
            'email': 'jsgumban@up.edu.ph',
            'password': 'password',
            'first_name': 'John Hel',
            'last_name': 'Gumban'
         })
         .expect(201)
         .end((err, res) => {
            expect(res.body.data).to.include.keys(['user', 'token']);
            done(err);
         });
   });
});
