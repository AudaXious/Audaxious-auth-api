import { AuthService } from "../services/app/auth.service.js";
import { getErrorMessage } from "../../errors/index.js";


/**
 * @description User account creation controller
 */
export const createUserAccount = async (req, res) => {
  try {
    const userReq = req.body;
    await AuthService.createUserAccountService(userReq);
    res.status(201).json({
      success: true,
      message: "Account created",
    });
    return;
  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({
      success: false,
      error: result,
    });
  }
};

/**
 * @description User login controller
 */
export const loginUserAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.loginUserAccountService(email, password);
    res.status(200).json({
      success: true,
      message: "Login Successful",
      ...user,
      token: user.token,
    });
    return;
  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({
      success: false,
      error: result,
    });
  }
};

/**
 * @description Otp verification controller.
 */
export const verifyUserOtp = async (req, res) => {
  try {
    const {otp} = req.params;
    const userId = await AuthService.verifyUserOtpService(otp)
    res.status(200).json({
      success: true,
      message: `Otp verified`,
    });
    return;
  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({
      success: false,
      error: result,
      userId
    });
  }
};


/**
 * @description forgot password controller.
 */
export const forgotPassword = async (req, res) =>{
  try {
    const {email} = req.body;
    const userId = await AuthService.forgotPasswordService(email)
    res.status(200).json({
      success: true,
      message: `Recovery Otp sent to ${email}`,
      userId
    });
    return;
  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({
      success: false,
      error: result,
    });
  }
}

export const changePassword = async(req, res) =>{
  try {
    const {password} = req.body;
    const {userId} = req.params;

    await AuthService.changePasswordService(userId, password)
    res.status(200).json({
      success: true,
      message: 'Password change successful',
    });
    return;
  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({
      success: false,
      error: result,
    });
  }
}