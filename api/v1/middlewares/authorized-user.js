'use strict';
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   // todo: api error
   if (token == null) return res.sendStatus(401);


   jwt.verify(token, process.env.JWT_TOKEN, (err, data) => {
      // todo: api error
      if (err) return res.sendStatus(403);
      req.user = data.user;
      req.client = data.client;
      next();
   });
};
