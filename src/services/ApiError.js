'use strict';

class ApiError extends Error {
   constructor({name, message, statusCode, errors}) {
     super(message || 'Error');
     this.name = name || 'Error';
     this.status = statusCode || 403;
     this.errors = errors || [];
  }

  toJSON() {
    return _.pick(this, ['status', 'name', 'message', 'errors']);
  }
}

module.exports = ApiError;
