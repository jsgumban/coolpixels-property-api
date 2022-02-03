'use strict';
const requireDirectory = require("require-directory");

global._ = require("lodash");
global.use = item => {
   if(item.match(/src\/(\w*\/\w*)*/g)) {
      return require(`${process.cwd()}/${item}`);
   }

   return require(item);
}

[
   'models',
   'services',
   'requests',
   'resources'
].forEach(dir => {
   let item = requireDirectory(module, `./${dir}`);
   _.merge(global, item);
});
