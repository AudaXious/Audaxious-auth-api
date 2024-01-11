import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const userSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
      default: () => uuidV4(),
      unique: true,
    },
    social_id: {
      type: String,
      unique : true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    otpCode: {
      type: String,
      required: true,
      default: "",
    },
    points: {
      type: String,
      required: true,
      default: "0",
    },
    religion: {
      type: String,
    },
    gender: {
      type: String,
    },
    employmentInfo: String,
    location: {
      type: String,
    },
    avatarUrl: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("Users", userSchema);

export default User;
