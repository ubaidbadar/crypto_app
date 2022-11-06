
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
    email: String,
    emailOTP: Number,
    phone: Number,
    phoneOTP: Number,
    role: {
        type: String,
        enum: ['Tear 1', 'Client', 'Admin'],
        default: 'Tear 1'
    }
}, { timestamps: true })


module.exports = model('users', User);