const User = require('../models/User');
const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateError = require('../utility/generateError');
const phoneOTP = require('../lib/phoneOTP');

const signInHandler = ({ password, OTPSid, email, ...user }) => {
    const expiresIn = new Date(new Date().getTime() + 3600000).toISOString();
    const token = jwt.sign(user, process.env.JWT_SECRETE_KEY, { expiresIn: "1h" });
    return { ...user, expiresIn, token };
}

exports.signup = async (req, res, next) => {
    try {
        const data = req.body;
        const phone = +data.phone;
        if (phone) {
            const user = await User.findOne({ phone: `${phone}` });
            if (user) generateError(403, "User already exist with same phone!");
            (await phoneOTP.sendPhoneOTP(phone));
            data.phone = phone
        }
        const user = await User.create(data);
        delete data.password;
        delete data.OTPSid;
        res.status(201).json({ ...data, _id: user._id });
    }
    catch (err) {
        next(err)
    }
}

exports.verifyPhoneOTP = async (req, res, next) => {
    try {
        const { phone, code } = req.body;
        const user = await User.findOne({ phone: `${+phone}` }, {}, { select: 'OTPSid' });
        if (!user) generateError(404, `User with this ${phone} doesn't exists!`)
        phoneOTP.verifyPhoneOTP(phone, code);
        res.status(201).json({ message: 'Successfully verified your phone!' })
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