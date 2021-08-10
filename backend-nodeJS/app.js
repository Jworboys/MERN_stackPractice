const express = require('express');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
	// Allows any domains to send requests.
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	next();
});

// This filter makes it so it doesnt have to be exact but has to atleast start with /api/places...that is because it app.use rather then a get or post... get or post etc.. makes it so it have to be exact.
app.use('/api/places', placesRoutes); // => /api/places/...
app.use('/api/users', usersRoutes);

// Defualt route for if route cannot be found.
app.use((req, res, next) => {
	const error = new HttpError('Could not find this route', 404);
	return next(error);
});

// Error route, for if an error not expected is thrown.
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}

	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown has occured.' });
});

mongoose
	.connect(
		''
	)
	.then(() => {
		app.listen(5000);
	})
	.catch(err => {
		console.log(err);
	});
