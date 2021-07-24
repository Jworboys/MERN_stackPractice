const express = require('express');
const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
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

const getPlacesByUserId = (request, response, next) => {
	const userId = request.params.uid;
	const places = DUMMY_PLACES.filter(p => {
		return p.creator === userId;
	});

	if (!places || places.length === 0) {
		return next(
			new HttpError('Could not find a places for the provided user ID', 404)
		);
	}

	response.json({ places });
};

const createPlace = (request, response, next) => {
	// Object destructoring is a shortcut for doing const title = req.body.title; on everything.
	const { title, description, coordinates, address, creator } = request.body;

	const createPlace = {
		// If the values have the same name you can just write it once, such as description there.
		// title could be the same.
		id: uuidv4(),
		title: title,
		description,
		location: coordinates,
		address,
		creator,
	};

	// push adds to the last element where as unshift(createPlace) -- would add to the start of the array.
	DUMMY_PLACES.push(createPlace);

	response.status(201).json({ place: createPlace });
};

const updatePlace = (req, res, next) => {
	const { title, description } = req.body;
	const placeId = req.params.pid;

	const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
	const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
	updatedPlace.title = title;
	updatedPlace.description = description;

	DUMMY_PLACES[placeIndex] = updatedPlace;
	res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
	const placeId = req.params.pid;
	DUMMY_PLACES = DUMMY_PLACES.filter(p => {
		p.id !== placeId;
	});

	res.status(200).json({ message: 'Place Deleted.' });
};

exports.deletePlace = deletePlace;
exports.updatePlace = updatePlace;
exports.createPlace = createPlace;
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
