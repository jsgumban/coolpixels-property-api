const router = require('express').Router();


router.post('/register', RegisterUserRequest, async (req, res) => {
   try {
      const client = req.client;

      const password = HashService.execute(req.body.password);
      const user = await new User({
         'email': req.body.email,
         'password': password,
         'first_name': req.body.first_name,
         'last_name': req.body.last_name,
      }).save().catch((err) => {
         throw new ApiError({
            message: err.detail ?? err.message,
         });
      });

      const response = AuthResource.make({ user, client }).response();
      res.status(201).json(response);
   } catch (err) {
      res.status(err.status || 403).json(err);
   }
});

router.post('/login', LoginUserRequest, async (req, res) => {
   try {
      const client = req.client;
      const email = req.body.email;
      const password = req.body.password;

      const user = await User.where({'email': email}).fetch().catch((err) => {
         throw new ApiError({
            statusCode: 401,
            message: 'Invalid username/password',
         });
      });

      const matched = HashService.compare(
         password,
         user.get('password'),
      );

      if (!matched) {
         throw new ApiError({
            statusCode: 401,
            message: 'Invalid username/password',
         });
      }

      const response = AuthResource.make({ user, client }).response();
      res.status(200).json(response);
   } catch (err) {
      console.log('err', err);
      res.status(err.status || 403).json(err);
   }
});

module.exports = router;
