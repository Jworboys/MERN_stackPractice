const express = require('express');

const router = express.Router();

router.get('/', (request, response, next) => {
	console.log('GET Request in Places.');
	response.json({
		message: 'It works!',
	});
});

module.exports = router;
