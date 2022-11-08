const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "YOUR_VERIFY_SID";
const client = require('twilio')(accountSid, authToken);

client.verify.v2
   .services(verifySid)
   .verifications.create({ to: "+19547954673", channel: "sms" })
   .then((verification) => console.log(verification.status))
   .then(() => {
     const readline = require('readline').createInterface({
       input: process.stdin,
       output: process.stdout
     });

     readline.question('Please enter the OTP:', otpCode => {
       client.verify.v2
         .services(verifySid)
         .verificationChecks.create({ to: "+19547954673", code: otpCode })
         .then((verification_check) => console.log(verification_check.status))
         .then(() => readline.close());
  });
});


module.exports = {};