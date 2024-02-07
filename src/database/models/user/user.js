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
    },
    fullName: {
      type: String,
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
    },
    password: {
      type: String,
    },
    otpCode: {
      type: String,
      index: { expires: "15m" },
    },
    gender: {
      type: String,
    },
    avatarUrl: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: {
        role: String,
        usage: [String],
        companyName: String,
        mediaNetwork : [String],
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const fifteenMinutesInMs = 15 * 60 * 1000; // 15 minutes in milliseconds
  if (this.isModified("otpCode") && this.otpCode !== null) {
    setTimeout(() => {
      this.otpCode = null;
      next();
    }, fifteenMinutesInMs);
  } else {
    next();
  }
});

const User = model("Users", userSchema);

export default User;
