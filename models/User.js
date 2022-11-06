
const { Schema, model } = require('mongoose');


const User = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true
    },
    isEmailVerfied: {
        type: Boolean,
        default: false
    },
    phone: Number,
    isPhoneVerfied: {
        type: Number,
        default: false
    },
    OTPSid: String,
    role: {
        type: String,
        enum: ['Tear 1', 'Client', 'Admin'],
        default: 'Tear 1'
    }
}, { timestamps: true });


module.exports = model('users', User);