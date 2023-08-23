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
        to: 'guptapushkar321@gmail.com',
        subject:'Hello',
        subject: options.subject,
        html: options.html
      }
    await  transporter.sendMail(mailoptions);
  }
module.exports = sendmail;
