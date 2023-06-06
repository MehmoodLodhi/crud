var nodemailer = require("nodemailer");

async function ourMail(email, otp) {
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mehmoodlodhi3@gmail.com",
      pass: "picscecsxaqjcbjd",
    },
  });
  let mailOptions = {
    from: "mehmoodlodhi3@gmail.com",
    to: email,
    subject: "OTP here",
    html: "Hello kiddan pharo apna OTP: " + otp,
  };
  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) console.log(error);
    else {
      console.log(response);
    }
  });
}
module.exports.ourMail = ourMail;
