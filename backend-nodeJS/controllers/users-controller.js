const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const user = require('../models/user');

const getUsers = async (req, res, next) => {
	let users;
	try {
		users = await User.find({}, '-password');
	} catch (err) {
		return next(
			new HttpError('Fetching users failed, please try again later.', 500)
		);
	}

	res.json({
		users: users.map(user => user.toObject({ getters: true })),
	});
};

const signup = async (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		console.log(error);
		return next(new HttpError('Invalid inputs, please check your data', 422));
	}
	const { name, email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		return next(
			new HttpError('Signing up failed, please try again later.', 500)
		);
	}

	if (existingUser) {
		return next(new HttpError('Signing up failed, user already exists.', 422));
	}

	const createdUser = new User({
		name,
		email,
		image:
			'https://cloverdalechiro.com/wp-content/uploads/2016/06/default-user-image-300x300.png',
		password,
		places: [],
	});

	try {
		await createdUser.save();
	} catch (error) {
		return next(new HttpError('Signing up failed, please try again.', 500));
	}
	res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
	const { email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		return next(
			new HttpError('loggin in failed, please try again later.', 500)
		);
	}
	if (!existingUser || existingUser.password !== password) {
		return next(
			new HttpError('Invalid credentials, could not log you in.', 401)
		);
	}
	res.json({ message: 'Logged in' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
