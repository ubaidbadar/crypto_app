
const { Schema, model } = require('mongoose');
const userId = require('../constants/userId');

const AuthDetails = new Schema({
    device: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    userId
}, { timestamps: true });


module.exports = model('AuthDetails', AuthDetails);