var nodemailer = require("nodemailer");
const pass = require("./pass.json");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "mehmoodlodhi3@gmail.com",
    pass: pass.pass,
    clientId:
      "299060008480-o9bh6a2524jh27oa8emhus8a7aa1rsei.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04OFm4hITiWrqCgYIARAAGAQSNwF-L9IrajJ-nna5TQndblgZVO-vQxQodxtfkNzagtPw4QXwyso_73kSVRAGNVw1LPDO8WnG6oE",
  },
});

async function ourMail(email, otp) {
  transporter.sendMail(
    {
      from: "mehmoodlodhi3@gmail.com.com",
      to: email,
      subject: "Sending Email using Node.js",
      text: "This is your otp to be verified " + otp,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent");
      }
    }
  );
}

module.exports.ourMail = ourMail;
