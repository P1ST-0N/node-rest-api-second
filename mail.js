import nodemailer from "nodemailer";
import "dotenv/config";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendMail = (message) => transport.sendMail(message);

// const message = {
//   to: "luckylionia@gmail.com",
//   from: "luckylionya@rambler.ru",
//   subject: "Something",
//   html: "<p>Helllo brow!) How are you?</p>",
//   text: "Helllo bro!) How are you?",
// };
// transport.sendMail(message).then(console.log).catch(console.log);
