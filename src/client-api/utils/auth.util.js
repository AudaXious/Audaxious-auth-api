import bcrypt from "bcrypt";
import { sendToMail } from "../services/email/email.service.js";

export const comparePassword = async (password, userPassword) => {
  const bool = await bcrypt.compare(password, userPassword);
  return bool;
};

export const hashPassword = async function (password) {
  const newPassword = await bcrypt.hash(password, 12);
  return newPassword;
};

const _generateOTP = () => {
  const code = Math.floor(Math.random() * 1000000); // 6-digit code
  return code.toString();
};

export const generateAndSendOTP = async (email) => {
  const otp = _generateOTP();
  await sendToMail({
    email: email,
    subject: "Use this OTP code",
    message: `<h4>Hello. Please use this 6-digits code: ${otp} </h4>`,
  });
  return otp;
};
