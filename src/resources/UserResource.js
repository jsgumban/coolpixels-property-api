const { Resource, ResourceCollection } = require('@senhung/http-resource');

class UserResource extends Resource {
   toJson(resource) {
      return {
         id: resource.id,
         email: resource.attributes.email,
         first_name: resource.attributes.first_name,
         last_name: resource.attributes.last_name
      }
   }
}

module.exports = {
   make:       (resource)  => new UserResource(resource),
   collection: (resources) => new ResourceCollection(resources, UserResource),
};
