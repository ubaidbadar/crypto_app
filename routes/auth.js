const router = require('express').Router();
const auth = require('../controllers/auth');
const signupValidator = require('../validations/signup');

router.post('/signup', signupValidator, auth.signup)
router.post('/signin', auth.signin)

router.post('/verify-phone', auth.verifyPhoneOTP)

module.exports = router;