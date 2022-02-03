'use strict';

const request = require('supertest');
const app = require(`${process.cwd()}/app`);

describe('POST /auth/login', () => {
   const clientId = 'client_id';
   const clientSecret = 'client_secret';
   const buffer = Buffer.from(`${clientId}:${clientSecret}`);
   const authorization = `Basic ${buffer.toString('base64')}`;

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

   it('returns a 200 when successful', done => {
      request(app)
         .post('/v1/auth/login')
         .set('Authorization', authorization)
         .send({
            'email': 'admin@admin.com',
            'password': 'password',
         })
         .expect(200)
         .end((err, res) => {
            expect(res.body.data).to.include.keys(['user', 'token']);
            done(err);
         });
   });
});
