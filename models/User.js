
const { hash } = require('bcrypt');
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
        validate: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true,
        default: `${Date.now()}@test.com`
    },
    isEmailVerfied: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        unique: true,
        default: `--${Date.now()}`
    },
    isPhoneVerfied: {
        type: Boolean,
        default: false
    },
    OTPSid: String,
    role: {
        type: String,
        enum: ['Tear 1', 'Client', 'Admin'],
        default: 'Tear 1'
    }
}, { timestamps: true });


User.pre('save', async function(next){
    this.password = await hash(this.password, 12);
    next();
})


module.exports = model('users', User);