
const { Schema, model } = require('mongoose');


const verifiedType = {
    type: Boolean,
    default: false
}

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
    },
    isEmailVerified: verifiedType,
    phone: {
        type: Number
    },
    isPhoneVerified: verifiedType,
    role: {
        type: String,
        enum: ['Tear 1', 'Client', 'Admin'],
        default: 'Tear 1'
    }
}, { timestamps: true })


module.exports = model('users', User);