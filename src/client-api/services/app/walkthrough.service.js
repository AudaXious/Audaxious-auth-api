import User from "../../../database/models/user/user.js";
import { ErrMissingKeyFields, ErrUserNotFound } from "../../../errors/index.js";

const updateUserInformationService = async(userReq, userId)=>{
    if(!userId) throw ErrMissingKeyFields;
    const {role, usage, companyName, mediaNetwork}=  userReq;
    const user = User.findOne({uuid : userId});
    if (!user) throw ErrUserNotFound;

    await user.updateOne({
        userInfo : {
            role,
            usage,
            companyName,
            mediaNetwork

        }
    });
    return;

}

export const WalkthroughService ={
    updateUserInformationService
}