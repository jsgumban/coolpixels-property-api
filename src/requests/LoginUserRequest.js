'use strict';
const { Validator } = require('node-input-validator');

const LoginUserRequest = async (req, res, next) => {
   try {
      const v = new Validator(req.body, {
         email: 'required|email',
         password: 'required'
      });

      const matched = await v.check();
      if (!matched) {
         throw new ApiError({
            errors: v.errors,
            statusCode: 422,
            message: 'Invalid request'
         });
      }

      next();
   } catch (err) {
      res.status(err.status || 403).json( err);
   }
}

module.exports = LoginUserRequest;
