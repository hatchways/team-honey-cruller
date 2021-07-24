const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_KEY)

// EXPECTING MESSAGE TO BE:
// {
//   to: 'test@example.com', 
//   from: 'tattooartproject@outlook.com',
//   subject: 'You won!!',
//   text: 'You just won a contest!',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
exports.sendMail = (msg) => {

  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}