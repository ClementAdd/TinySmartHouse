"use strict";

import { createTestAccount, createTransport, getTestMessageUrl } from "nodemailer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { signUpTemplate } from "./templates/signUp.js";
import { testMail } from "./templates/test.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mail_debug = true;

// TODO : To make the following function dynamic with parameters
// TODO : create a single instance for keeping the credentials

async function sendMail({ name, email, email_type, token, username }) {
  try {
    // Generate SMTP service account from ethereal.email
    const account = await createTestAccount();

    console.log("Credentials obtained => ", account);

    // TODO : NB! Store the account object values somewhere if you want
    // TODO : to re-use the same account for future mail deliveries

    // Create a SMTP transporter object
    const transporter = createTransport(
      {
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        logger: mail_debug,
        debug: false, // include SMTP traffic in the logs
      },
      {
        // default message fields

        // sender info
        from: `<${account.user}>`,
        headers: {
          "X-Laziness-level": 1000, // just an example header, no need to use this
        },
      }
    );

    // Message object
    let message;
    if (email_type === "sign-up") {
      message = signUpTemplate(username, name, email, token);
    } else {
      message = testMail()
    }

    console.log("sending message...");
    const info = transporter.sendMail(message);

    console.log("Message sent successfully!");
    console.log(`URL to the message ${getTestMessageUrl(info)}`);

    // only needed when using pooled connections
    transporter.close();
  } catch (error) {
    console.error(error);
  }
}

export default sendMail;
