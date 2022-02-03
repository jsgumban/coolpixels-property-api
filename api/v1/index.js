const router = require('express').Router();
const auth = require('./auth');
const properties = require('./properties');

const authorizedUser = require('./middlewares/authorized-user');
const authorizedClient = require('./middlewares/authorized-client');

router.use('/auth', authorizedClient, auth);
router.use('/properties', authorizedUser, properties);

module.exports = router;
