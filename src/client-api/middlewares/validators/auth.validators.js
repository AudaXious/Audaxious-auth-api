import joi from "joi";

const passwordValidationRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

export const createUserAccountValidator = joi
  .object({
    fullName: joi.string().required(),
    email: joi.string().email().required(),
    phoneNumber: joi.string().required(),
    password: joi
      .string()
      .min(8)
      .max(32)
      .required()
      .regex(passwordValidationRegex),
  })
  .messages({
    "string.pattern.base":
      "Password must be of 8 characters, must have an upper case letter, and must include at least one special character (!@#$%^&*)",
  });

export const loginUserAccountValidator = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(32).required(),
});

export const forgotPasswordValidator = joi.object({
  email: joi.string().email().required(),
});

export const changePasswordValidator = joi
  .object({
    password: joi
      .string()
      .min(8)
      .max(32)
      .required()
      .regex(passwordValidationRegex),
  })
  .messages({
    "string.pattern.base":
      "Password must be of 8 characters, must have an upper case letter, and must include at least one special character (!@#$%^&*)",
  });
