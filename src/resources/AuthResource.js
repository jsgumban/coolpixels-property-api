const { Resource, ResourceCollection } = require('@senhung/http-resource');
const jwt = require('jsonwebtoken');

class AuthResource extends Resource {
   toJson(resource) {
      const user = UserResource.make(resource.user).response().data;
      const client = resource.client;
      
      return {
         user: user,
         token: jwt.sign({ user, client }, process.env.JWT_TOKEN, {expiresIn: process.env.JWT_TOKEN_EXP})
      }
   }
}

module.exports = {
   make:       (resource)  => new AuthResource(resource),
   collection: (resources) => new ResourceCollection(resources, AuthResource),
};
