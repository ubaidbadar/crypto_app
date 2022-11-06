const { Schema, model } = require('mongoose');
const userId = require('../constants/userId');

const Wallet = new Schema({
    publicKey: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true,
    },
    network: {
        type: String,
        enum: ['mainnet', 'testnet']
    },
    blockChain: {
        type: String,
        default: 'BTC',
        enum: ['BTC']
    },
    isActive: {
        type: Boolean,
        default: false
    },
    userId
}, { timestamps: true })


module.exports = model('wallets', Wallet);