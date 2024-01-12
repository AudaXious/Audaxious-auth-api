import Joi from "joi";

export const updateUserInformationValidator = Joi.object({
    role : Joi.string().required(),
    usage : Joi.string().required(),
    companyName : Joi.string().required(),
    productName : Joi.string().required(),
    userId : Joi.string().required(),

})