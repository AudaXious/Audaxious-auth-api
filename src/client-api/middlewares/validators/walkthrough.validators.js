import Joi from "joi";

export const updateUserInformationValidator = Joi.object({
    role : Joi.string().required(),
    usage : Joi.array().required(),
    companyName : Joi.string().required(),
    mediaNetwork : Joi.array().required(),
    userId : Joi.string().required(),

})