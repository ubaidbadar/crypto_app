const { oneOf, body } = require('express-validator');
const next = require('./next');

module.exports = [
    oneOf([
        body('email').isEmail(),
        body('phone').isNumeric().isLength({ min: 10, max: 15 })
    ]),
    body('firstName'),
    body('lastName'),
    body('password').isStrongPassword().withMessage('Passowrd must contain 1 uppercase, 1 lowercase and 1 numeric key and 1 special character'),
    next
]