const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendPhoneOTP = async phone => {
    return client.verify.v2.services.create({ friendlyName: 'DCX' })
        .then(res => client.verify.v2.services(res.sid).verifications.create({ to: `+${+phone}`, channel: 'sms' }))
}

exports.verifyPhoneOTP = (phone, code, sid) => {
    console.log(phone, code, sid);
    return client.verify.v2
    .services(sid)
    .verificationChecks.create({ to: `+${+phone}`, code })
    .then((verification_check) => console.log(verification_check.status))
}