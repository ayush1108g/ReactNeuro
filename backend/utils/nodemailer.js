const nodemailer = require('nodemailer');
  const sendmail =async options => {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "3d7d0497db4462",
          pass: "05ecf51c951450"
        }
      });
      const mailoptions = {
        from: 'pushkargupta063@gmail.com',
        to: options.email,
        subject:options.subject,
        text: options.message,
      }
    await  transporter.sendMail(mailoptions);
  }
module.exports = sendmail;
