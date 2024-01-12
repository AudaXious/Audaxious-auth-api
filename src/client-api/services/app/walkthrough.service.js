import User from "../../../database/models/user/user.js";
import { ErrUserNotFound } from "../../../errors/index.js";

const updateUserInformationService = async(userReq)=>{
    const {role, usage, companyName, productName, userId }=  userReq;
    const user = User.findOne({uuid : userId});
    if (!user) throw ErrUserNotFound;

    await user.updateOne({
        userInfo : {
            role,
            usage,
            companyName,
            productName

        }
    });
    return;

}

export const WalkthroughService ={
    updateUserInformationService
}