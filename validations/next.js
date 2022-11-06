const { validationResult } = require('express-validator');
const generateError = require("../utility/generateError");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) generateError(400, "Validation failed!", errors.array());
    next();
}