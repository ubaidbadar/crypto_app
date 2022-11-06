const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN).verify.v2;

exports.sendPhoneOTP = async phone => {
    return twilio.services.create({ friendlyName: 'crypto' })
        .then(res => twilio.services(res.sid).verifications.create({ to: `+${+phone}`, channel: 'sms' }))
}

// exports.verifyPhonOTP = (to, code) => create({ to, code });