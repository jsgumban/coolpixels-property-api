const router = require('express').Router();

router.get('/', async ( req, res ) => {
	try {
		const id = req.query.id;
		let query;
		
		if (id) {
			// fetch properties by id
			query = await new Property().where({ id: id }).fetch({
	      withRelated: [ 'expenses', 'incomes' ],
	    }).catch(( err ) => {
				throw new ApiError({
           message: err.detail ?? err.message,
         });
			});
		} else {
			// fetch all properties
			query = await new Property().fetchAll().catch(( err ) => {
				throw new ApiError({
          message: err.detail ?? err.message,
        });
			});
		}
		
		res.status(200).json(query);
	} catch (err) {
		console.log('err', err);
		res.status(err.status || 403).json(err);
	}
});


router.post('/', async ( req, res ) => {
	try {
		// create property
		const property = await new Property({
      'name': req.body.name,
    }).save().catch(( err ) => {
			throw new ApiError({
	      message: err.detail ?? err.message,
	    });
		});
		
		res.status(201).json(property);
	} catch (err) {
		console.log('err', err);
		res.status(err.status || 403).json(err);
	}
});


module.exports = router;
