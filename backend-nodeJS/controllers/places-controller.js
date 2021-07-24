const HttpError = require('../models/http-error');

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

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }
const getPlaceById = (request, response, next) => {
	const placeId = request.params.pid;
	// { pid: 'p1' } -- params is an object in which were we can the values from the keys to the desired inputs. -- such as the /:pid in this case.

	const place = DUMMY_PLACES.find(p => {
		return p.id === placeId;
	});

	if (!place) {
		// - Make sure to return our the following code block will still run and will try and return another object.
		return next(
			new HttpError('Could not find a place for the provided ID', 404)
		);
	}

	response.json({ place });
};

const getPlaceByUserId = (request, response, next) => {
	const userId = request.params.uid;
	const place = DUMMY_PLACES.find(p => {
		return p.creator === userId;
	});

	if (!place) {
		return next(
			new HttpError('Could not find a place for the provided user ID', 404)
		);
	}

	response.json({ place });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
