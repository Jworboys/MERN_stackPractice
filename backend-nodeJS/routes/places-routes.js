const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State Building',
		description: 'One of the most famous sky scrappers in the world.',
		location: {
			lat: 40.7484474,
			lng: -73.9871516,
		},
		address: '20 W 34th St, New York, NY 10001',
		creator: 'u1',
	},
];

router.get('/:pid', (request, response, next) => {
	const placeId = request.params.pid;
	// { pid: 'p1' } -- params is an object in which were we can the values from the keys to the desired inputs. -- such as the /:pid in this case.

	const place = DUMMY_PLACES.find(p => {
		return p.id === placeId;
	});

	if (!place) {
		const error = new Error('Could not find a place for the provided ID.');
		error.code = 404;
		return next(error); // - Make sure to return our the following code block will still run and will try and return another object.
	}

	response.json({
		place,
	});
});

router.get('/user/:uid', (request, response, next) => {
	const userId = request.params.uid;
	const place = DUMMY_PLACES.find(p => {
		return p.creator === userId;
	});

	if (!place) {
		const error = new Error('Could not find a place for the provided user ID.');
		error.code = 404;
		return next(error);
	}

	response.json({
		place,
	});
});

module.exports = router;
