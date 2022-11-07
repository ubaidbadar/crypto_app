const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN).verify.v2;

exports.sendPhoneOTP = async phone => {
    return twilio.services.create({ friendlyName: 'DCX' })
        .then(res => twilio.services(res.sid).verifications.create({ to: `+${+phone}`, channel: 'sms' }))
}

exports.verifyPhoneOTP = (phone, code, sid) => twilio.services(sid).verificationChecks.create({ to: `+${+phone}`, code })