var nodemailer = require("nodemailer");

const oauth2Client = new OAuth2(
  "299060008480-o9bh6a2524jh27oa8emhus8a7aa1rsei.apps.googleusercontent.com", //Client ID
  "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", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token:
    "1//04OFm4hITiWrqCgYIARAAGAQSNwF-L9IrajJ-nna5TQndblgZVO-vQxQodxtfkNzagtPw4QXwyso_73kSVRAGNVw1LPDO8WnG6oE",
});

const accessToken = oauth2Client.getAccessToken();
const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "mehmoodlodhi3@gmail.com",
    clientId:
      "299060008480-o9bh6a2524jh27oa8emhus8a7aa1rsei.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04OFm4hITiWrqCgYIARAAGAQSNwF-L9IrajJ-nna5TQndblgZVO-vQxQodxtfkNzagtPw4QXwyso_73kSVRAGNVw1LPDO8WnG6oE",
    accessToken: accessToken,
  },
});
async function ourMail(email, otp) {
  const mailOptions = {
    from: "mehmoodlodhi3@gmail.com",
    to: email,
    subject: "OTP here",
    html: "Hello kiddan pharo apna OTP: " + otp,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log("OTP sent to: " + email);
    smtpTransport.close();
  });
}
module.exports.ourMail = ourMail;
