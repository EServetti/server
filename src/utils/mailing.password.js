import { createTransport } from "nodemailer";
import environment from "../utils/env.utils.js";
const {PORT} = environment

async function recovePassword(data) {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: environment.GOOGLE_EMAIL,
        pass: environment.GOOGLE_PASSWORD,
      },
    });
    await transport.verify();
    const verificationUrl = `http://localhost:5173/recover-password/${data._id}`;
    const htmlContent = `
      <h1>Change your password</h1>
      <p>Click the link below to change your password:</p>
      <a href="${verificationUrl}" style="padding: 10px 20px; background-color: blue; color: white; text-decoration: none; border-radius: 5px;">
        Go
      </a>
    `;
    await transport.sendMail({
      from: `Everithing for your home <${environment.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `Recover your password`,
      html: htmlContent
    });
  } catch (error) {
    throw error;
  }
}

export { recovePassword };
