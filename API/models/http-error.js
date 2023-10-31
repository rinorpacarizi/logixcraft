class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // Add a "message" property
    this.error = errorCode;
  }
}

module.exports = HttpError;