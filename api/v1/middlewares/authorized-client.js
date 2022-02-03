'use strict';
const auth = require('basic-auth');


module.exports = async (req, res, next) => {
   try {
      const creds = auth(req);
      if (!creds.name || !creds.pass) {
         throw new ApiError({
            statusCode: 401,
            message: 'Invalid credentials'
         });
      }
      
      const client = await Client.where({ client_id: creds.name, client_secret: creds.pass }).fetch().catch(() => {
         throw new ApiError({
            statusCode: 401,
            message: 'Invalid credentials'
         });
      });

      req.client = client.get('client_id');
      next();
   } catch (err) {
      res.status(err.status || 403).json( err);
   }
};
