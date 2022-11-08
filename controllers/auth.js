const User = require('../models/User');
const { compare } = require('bcrypt');
const generateError = require('../utility/generateError');
const phoneOTP = require('../lib/phoneOTP');
const getUser = require('../utility/getUser');
const signInHandler = require('../utility/signInHandler');


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
        const userDOC = await User.create(data);
        res.status(201).json(getUser(userDOC));
    }
    catch (err) {
        next(err)
    }
}

exports.verifyPhoneOTP = async (req, res, next) => {
    try {
        const { phone, code } = req.body;
        const user = await User.findOne({ phone: `${+phone}` }, {}, { select: '-password' });
        if (!user) generateError(404, `User with this +${+phone} doesn't exists!`)
        await phoneOTP.verifyPhoneOTP(phone, code);
        user.isPhoneVerfied = true;
        await user.save();
        signInHandler(user, res)
    }
    catch (err) {
        next(err)
    }
}



exports.signin = async (req, res, next) => {
    try {
        const user = await User.findOne(req.body, {}, { select: '-password' });
        if (!user) generateError(401, 'Invalid credentials !');
        const isEqual = await compare(req.body.password, user.password);
        if(!isEqual) generateError(401, 'Invalid credentials !');
        signInHandler(user, res);
    }
    catch (err) {
        next(err)
    }
}