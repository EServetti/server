import { createTransport } from "nodemailer";
import environment from "../utils/env.utils.js";
const {PORT} = environment

async function sendEmail(data) {
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
    const verificationUrl = `http://localhost:${PORT}/api/sessions/verify?email=${encodeURIComponent(data.to)}&verifyCode=${encodeURIComponent(data.verifyCode)}`;
    const htmlContent = `
      <h1>Welcome to our store!</h1>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationUrl}" style="padding: 10px 20px; background-color: blue; color: white; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
    `;
    await transport.sendMail({
      from: `Everithing for your home <${environment.GOOGLE_EMAIL}>`,
      to: data.to,
      subject: `Verification to ${data.name}`,
      html: htmlContent
    });
  } catch (error) {
    throw error;
  }
}

export { sendEmail };
