const create = require('./phoneClient')
    .verify.v2
    .services("VAd2ff2cfa17736065c194ac1ebeda918f")
    .verificationChecks.create;

exports.sendPhoneOTP = to => create({ to: `+${+to}`, channel: "sms" })

exports.verifyPhonOTP = (to, code) => create({ to, code });