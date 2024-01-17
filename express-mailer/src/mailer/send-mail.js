"use strict";

import { createTestAccount, createTransport, getTestMessageUrl } from "nodemailer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mail_debug = true;

// TODO : To make the following function dynamic with parameters
// TODO : create a single instance for keeping the credentials

async function sendMail() {
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
    const message = {
      // Comma separated list of recipients
      to: "Andris Reinman <andris@ethereal.email>",

      // Subject of the message
      subject: "Nodemailer is unicode friendly ✔",

      // plaintext body
      text: "Hello to myself!",

      // HTML body
      html:
        '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
        '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',

      // An array of attachments
      attachments: [
        // String attachment
        {
          filename: "notes.txt",
          content: "Some notes about this e-mail",
          contentType: "text/plain", // optional, would be detected from the filename
        },

        // Binary Buffer attachment
        {
          filename: "image.png",
          content: Buffer.from(
            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/" +
              "//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U" +
              "g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC",
            "base64"
          ),

          cid: "note@example.com", // should be as unique as possible
        },

        // File Stream attachment
        {
          filename: "nyan cat ✔.gif",
          path: `${__dirname}/assets/nyan.gif`,
          cid: "nyan@example.com", // should be as unique as possible
        },
      ],
    };

    console.log("sending message...");
    const info = await transporter.sendMail(message);

    console.log("Message sent successfully!");
    console.log(`URL to the message ${getTestMessageUrl(info)}`);

    // only needed when using pooled connections
    transporter.close();
  } catch (error) {
    console.error(error);
  }
}

// sendMail().catch((err) => {
//   console.error(err.message);
//   process.exit(1);
// });

export default sendMail;
