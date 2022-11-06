const User = require('../models/User');
const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateError = require('../utility/generateError');
const generateOTP = require('../utility/generateOTP');
const phoneOTP = require('../lib/phoneOTP');

const signInHandler = ({ password, OTPSid, email, ...user }) => {
    if (user.email.includes('@test.com')) delete user.email;
    const expiresIn = new Date(new Date().getTime() + 3600000).toISOString();
    const token = jwt.sign(user, process.env.JWT_SECRETE_KEY, { expiresIn: "1h" });
    return { ...user, expiresIn, token };
}

exports.signup = async (req, res, next) => {
    try {
        const { phone, ...data } = req.body;
        if (!data.email) data.email = `${Date.now()}@test.com`;
        if (phone) {
            const user = await User.findOne({ phone })
            if (user) generateError(401, 'User already exists with same phone!');
            User.OTPSid = (await phoneOTP.sendPhoneOTP(phone)).sid;
            console.log(26)
        }
        const user = await User.create(data);
        res.status(201).json(signInHandler(user._doc));
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