const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const DUMMY_USERS = [
	{
		id: 'u1',
		name: 'Jordan worb',
		email: 'test@test.com',
		password: 'testers',
	},
];

const getUsers = (req, res, next) => {
	res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		console.log(error);
		return next(new HttpError('Invalid inputs, please check your data', 422));
	}
	const { name, email, password, places } = req.body;

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
		places,
	});

	try {
		await createdUser.save();
	} catch (error) {
		return next(new HttpError('Signing up failed, please try again.', 500));
	}
	res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
	const { name, email, password } = req.body;

	const identifiedUser = DUMMY_USERS.find(u => u.email === email);
	if (!identifiedUser || identifiedUser.password !== password) {
		return next(
			new HttpError('Could not identify user. Invalid credentials.', 401)
		);
	}

	res.json({ message: 'Logged in' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
