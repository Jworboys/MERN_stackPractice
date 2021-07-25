const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controller');

router.get('/', usersControllers.getUsers);
router.post(
	'/signup',
	[
		check('name').notEmpty(),
		check('email').normalizeEmail().isEmail(), // Test@test.com => test@test.com
		check('password').isLength({ min: 6 }),
	],
	usersControllers.signup
);
router.post('/login', usersControllers.login);
module.exports = router;
