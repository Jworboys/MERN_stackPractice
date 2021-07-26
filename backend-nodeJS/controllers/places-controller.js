const express = require('express');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');
const mongoose = require('mongoose');

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }
const getPlaceById = async (request, response, next) => {
	const placeId = request.params.pid;
	// { pid: 'p1' } -- params is an object in which were we can the values from the keys to the desired inputs. -- such as the /:pid in this case.

	let place;

	try {
		place = await Place.findById(placeId);
	} catch (err) {
		return next(new HttpError('Could not find place.', 500));
	}

	if (!place) {
		// - Make sure to return our the following code block will still run and will try and return another object.
		return next(
			new HttpError('Could not find a place for the provided ID', 404)
		);
	}

	response.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (request, response, next) => {
	const userId = request.params.uid;

	let places;
	try {
		places = await Place.find({ creator: userId });
	} catch (err) {
		return next(
			new HttpError('Fetching places failed, please try again.', 500)
		);
	}

	if (!places || places.length === 0) {
		return next(
			new HttpError('Could not find a places for the provided user ID', 404)
		);
	}

	response.json({
		places: places.map(place => place.toObject({ getters: true })),
	});
};

const createPlace = async (request, response, next) => {
	const error = validationResult(request);
	if (!error.isEmpty()) {
		console.log(error);
		return next(new HttpError('Invalid inputs, please check your data', 422));
	}
	// Object destructoring is a shortcut for doing const title = req.body.title; on everything.
	const { title, description, address, creator } = request.body;

	let coordinates;
	try {
		coordinates = await getCoordsForAddress(address);
	} catch (error) {
		return next(error);
	}

	const createdPlace = new Place({
		// If the values have the same name you can just write it once, such as description there.
		// title could be the same.
		title: title,
		description,
		address,
		location: coordinates,
		image:
			'https://marvel-b1-cdn.bc0a.com/f00000000179470/www.esbnyc.com/sites/default/files/styles/on_single_feature/public/2020-02/Green%20lights.jpg?itok=nRbtw3hG',
		creator,
	});

	let user;
	try {
		user = await User.findById(creator);
	} catch (err) {
		return next(new HttpError('Creating failed, please try again.', 500));
	}

	if (!user) {
		return next(new HttpError('Could not find user for provided Id.', 404));
	}
	console.log(createdPlace);
	try {
		// This is like a rollback for if any errors occur.
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdPlace.save({ session: sess });
		user.places.push(createdPlace);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		return next(new HttpError('Creating place failed, please try again.', 500));
	}

	response.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		console.log(error);
		return next(new HttpError('Invalid inputs, please check your data', 422));
	}
	const { title, description } = req.body;
	const placeId = req.params.pid;

	let place;
	try {
		place = await Place.findById(placeId);
	} catch (err) {
		return next(
			new HttpError('Something went wrong, could not update place.', 500)
		);
	}

	place.title = title;
	place.description = description;

	try {
		await place.save();
	} catch (err) {
		return next(
			new HttpError('Something went wrong, could not update place.', 500)
		);
	}

	// Making it a javascript object and make there be a nother id variable without the _ in front.
	res.json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
	const placeId = req.params.pid;
	let place;

	try {
		place = await Place.findById(placeId).populate('creator');
	} catch (err) {
		return next(
			new HttpError('Something went wrong, could not delete place.', 500)
		);
	}

	if (!place) {
		return next(new HttpError('Could not find place for this id.', 404));
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await place.remove({ session: sess });
		place.creator.places.pull(place);
		await place.creator.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		return next(
			new HttpError('Something went wrong, could not delete place.', 500)
		);
	}

	res.status(200).json({ message: 'Place Deleted.' });
};

exports.deletePlace = deletePlace;
exports.updatePlace = updatePlace;
exports.createPlace = createPlace;
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
