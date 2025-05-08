export const signUpTemplate = (username, name, email, token) => {
  const message = {
    // Comma separated list of recipients
    to: `${name} <${email}>`,

    // Subject of the message
    subject: "Account Verification Email",

    // plaintext body
    text: `Thank you for joining us. Please click the link below to verify your account:
    Verification Link : http://localhost:3000/auth/verify-mail?token=${token}&user=${username}
    If you did not request this verification, please ignore this email.`,

    // HTML body
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification Email</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 50px auto;
        background-color: #ffffff;
        padding: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
    </head>
    <body>
      <div class="container">
        <h2>Account Verification</h2>
        <p>Thank you for joining us. Please click the link below to verify your account:</p>
        <a href="http://localhost:3000/auth/verify-mail?token=${token}&user=${username}" class="button">Verify Account</a>
        <p>If you did not request this verification, please ignore this email.</p>
      </div>
    </body>
    </html>
    `,
  };

  return message;
};
