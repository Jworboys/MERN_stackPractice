const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');

const app = express();

// This filter makes it so it doesnt have to be exact but has to atleast start with /api/places...that is because it app.use rather then a get or post... get or post etc.. makes it so it have to be exact.
app.use('/api/places', placesRoutes); // => /api/places/...
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}

	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown has occured.' });
});

app.listen(5000);
