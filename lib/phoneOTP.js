const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN).verify.v2;
const sid = "VAbee6716db229347ca3025849300ca6b2";






exports.sendPhoneOTP = phone => client.services(sid).verifications.create({ to: `+${+phone}`, channel: 'sms' })

exports.verifyPhoneOTP = (phone, code) => {
    return client
        .services(sid)
        .verificationChecks.create({ to: `+${+phone}`, code: +code })
        .then((verification_check) => console.log(verification_check.status))
}