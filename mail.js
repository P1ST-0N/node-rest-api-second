import nodemailer from "nodemailer";
import "dotenv/config";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.MAIL_USER,
    pass: process.MAIL_PASSWORD,
  },
});

export const sendMail = (message) => transport.sendMail(message);

const message = {
  to: "luckylionya@rambler.ru",
  from: "luckylionia@gmail.com",
  subject: "Something",
  html: "<p>Helllo brow!) How are you?</p>",
  text: "Helllo bro!) How are you?",
};
transport.sendMail(message).then(console.log).catch(console.log);
