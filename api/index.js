'use strict';
const router = require('express').Router();
const v1 = require('./v1');

router.get('/', (req, res) => {
   res.json({
      app: 'express',
      date: new Date().toISOString()
   });
});

router.use('/v1', v1);

module.exports = router;
