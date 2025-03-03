import User from "@/models/userModel";
import { verify } from "crypto";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

interface EmailOptions {
  email: string;
  emailtype: "VERIFY" | "RESET";
  userId: string;
}

export const Sendemail = async ({ email, emailtype, userId }: EmailOptions) => {
  try {
    const hashedtoken = await bcryptjs.hash(userId.toString(), 10);
    if (emailtype === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifytoken: hashedtoken,
        verifytokenExpiry: Date.now() + 3600000,
      });
    } else if (emailtype === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotpasswordtoken: hashedtoken,
        forgotpasswordtokenExpiry: Date.now() + 3600000,
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c03c2a47fac69e",
        pass: "********b616",
      },
    });
    const mailoptions = {
      from: "junaid@riaz.ai",
      to: email, // list of receivers
      subject:
        emailtype === "VERIFY" ? "VERIFY your email" : "Reset your password", // Subject line
      text: "Hello world?", // plain text body
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedtoken}">here</a> 
      to ${
        emailtype === "VERIFY" ? "verify your email" : "reset your password"
      } 
      or copy and paste the link below in your browser.<br> 
      ${process.env.DOMAIN}/verifyemailtoken=${hashedtoken}</p>`,
      // html body
    };

    const mailresponse = await transport.sendMail(mailoptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message); // Fixed the error handling
  }
};
