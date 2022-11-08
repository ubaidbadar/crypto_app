const { body } = require('express-validator');
const next = require('./next');


module.exports = [
    body('phone'),
    body('code').isNumeric().isLength({ min: 6, max: 6 }),
    next
]