const generateError = (statusCode = 500, message = 'Internal Server error', errors) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    if (errors) err.errors = errors;
    throw err;
}

module.exports = generateError;