import User from "../../../database/models/user/user.js";
import {
  hashPassword,
  comparePassword,
  generateAndSendOTP,
} from "../../utils/auth.util.js";
import {
  ErrEmailAlreadyExists,
  ErrUserNotFound,
  ErrInvalidPassword,
  ErrInvalidOTP,
} from "../../../errors/index.js";

import { generateToken } from "../security/token.service.js";

/**
 * @description  This method creates a User Account
 * @param (userReq) i.e user attributes object
 * @returns user object
 */
const createUserAccountService = async (userReq) => {
  const { email, password } = userReq;

  const user = await User.findOne({ where: { email: email } });

  if (user) throw ErrEmailAlreadyExists;

  const hp = await hashPassword(password);

  const otp = await generateAndSendOTP(email);

  const newUser = await User.create({
    ...userReq,
    password: hp,
    otpCode: otp,
  });

  return newUser;
};

/**
 * @description  This method logs in an already registered User Account
 * @param (email, password) : string
 * @returns   user & token object
 */
const loginUserAccountService = async (email, password) => {
  const findUser = await User.findOne({ email: email });
  if (!findUser) throw ErrUserNotFound;

  const passwordCompare = await comparePassword(password, findUser.password);
  if (!passwordCompare) throw ErrInvalidPassword;

  const payload = {
    uuid: findUser.uuid,
  };

  const token = await generateToken(payload);

  return { findUser, token };
};

/**
 * @description  Verifies a received user otp with the otpCode stored in the database
 * @param (otp) : string
 * @returns   true
 */
const verifyUserOtpService = async (otp) => {
  const user = await User.findOne({ otpCode: otp });
  if (!user) throw ErrInvalidOTP;
  await user.updateOne({ isVerified: true, otpCode: null });
  return user.uuid;
};

/**
 * @description  Fetches a user in the database using email, and sends otp to the email.
 * @param (email) : string
 * @returns   User Id(uuid)
 */
const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) throw ErrUserNotFound;
  const otp = await generateAndSendOTP(email);
  await user.updateOne({ otpCode: otp });
  return user.uuid;
};

/**
 * @description  Fetches a user in the database using email, and sends otp to the email.
 * @param (email) : string
 * @returns   User Id(uuid)
 */
const changePasswordService = async (userId, password) => {
  const user = await User.findOne({ uuid: userId });
  if (!user) throw ErrUserNotFound;
  const hp = await hashPassword(password);
  await user.updateOne({ password: hp, otpCode: null });
  return;
};

const socialAuthLoginService = async (userObj) => {
  let findUser;
  findUser = await User.findOne({ email: userObj.email });

  if (!findUser) {
    findUser = await User.create({
      email: userObj.email,
      fullName: `${userObj.firstName} ${userObj.lastName}`,
      social_id: userObj.id,
    });
  }
  const payload = {
    uuid: findUser.uuid,
  };

  const token = await generateToken(payload);

  return { token, user: findUser.email };
};

export const AuthService = {
  createUserAccountService,
  loginUserAccountService,
  verifyUserOtpService,
  forgotPasswordService,
  changePasswordService,
  socialAuthLoginService,
};
