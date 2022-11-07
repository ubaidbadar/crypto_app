// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console and set the environment variables.
// See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VEc6779a5deb9a2520b49718be1ce4927d";
const client = require('twilio')(accountSid, authToken);

console.log('called')

client.verify.v2
   .services(verifySid)
   .verifications.create({ to: "+12125187402", channel: "sms" })
   .then((verification) => console.log(verification.status))
   .then(() => {
     const readline = require('readline').createInterface({
       input: process.stdin,
       output: process.stdout
     });

     readline.question('Please enter the OTP:', otpCode => {
       client.verify.v2
         .services(verifySid)
         .verificationChecks.create({ to: "+12125187402", code: otpCode })
         .then((verification_check) => console.log(verification_check.status))
         .then(() => readline.close());
  })
  .catch(err => console.log(err))
});


module.exports = {}