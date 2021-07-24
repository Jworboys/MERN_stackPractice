const express = require('express');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(express.json());

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

app.listen(5000);
