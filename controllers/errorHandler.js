exports.errorHandler = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const errors = error.errors;
    console.log('errorhandler')
    console.log(error);
    console.log('');
    res.status(status).json({ message: message, data: errors });
}