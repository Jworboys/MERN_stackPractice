class HttpError extends Error {
	constructor(message, errorCode) {
		super(message); // Add a 'message' property, to the parent beacuse it already has.
		this.code = errorCode; // Adds a 'code' prop to this object.
	}
}

module.exports = HttpError;
