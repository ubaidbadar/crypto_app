const router = require('express').Router();
const { signup, signin } = require('../controllers/auth');
const signupValidator = require('../validations/signup');

router.post('/signup', signupValidator, signup)
router.post('/signin', signin)

module.exports = router;