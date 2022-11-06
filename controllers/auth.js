const User = require('../models/User');
const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateError = require('../utility/generateError');
const generateOTP = require('../utility/generateOTP');
const phoneOTP = require('../lib/phoneOTP');

const signInHandler = user => {
    const expiresIn = new Date().getTime() + 3600000;
    const token = jwt.sign(user, process.env.JWT_SECRETE_KEY, { expiresIn: "1h" });
    return { userId: _id, displayName, email, photoURL, token, expiresIn };
}

exports.signup = async (req, res, next) => {
    try {
        const { email, phone, ...data } = req.body;
        if (email) {
            const user = await User.findOne({ email })
            if (user) generateError(401, 'User already exists with same email!');
            data.emailOTP = generateOTP()
        }
        if (phone) {
            const user = await User.findOne({ phone })
            if (user) generateError(401, 'User already exists with same phone!');
            const res = await phoneOTP.sendPhoneOTP("+12485795654")
        }
        const user = await User.create(data);
        res.status(201).json(signInHandler(user));
    }
    catch (err) {
        next(err)
    }
}



exports.signin = (req, res, next) => {
    const { email, password } = req.body;
    let loggedUser = null;
    User.findOne({ email }, {}, { select: '-password' })
        .then(user => {
            if (user) {
                loggedUser = user;
                return compare(password, user.password)
            }
            generateError(401, 'Email or password is invalid!');
        })
        .then(isEqual => isEqual ? signInHandler(loggedUser) : generateError(401, 'Email or Password is invalid!'))
        .then(loadedUser => res.status(200).json(loadedUser))
        .catch(next)
}