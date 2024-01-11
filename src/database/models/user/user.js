import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const User = sequelize.define(
  "user",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    social_id :{
      type : DataTypes.STRING,
      allowNull : true,
      defaultValue : null,
    },
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue : "",
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue : "",
    },
    otpCode: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: true,
    },
    points: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    religion: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    gender: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    employmentInfo: {
      type: DataTypes.JSONB,
      allowNull: true,
      validate: {
        isValidEmploymentInfo(value) {
          if (value !== undefined) {
            // Check if value is an object
            if (typeof value !== "object") {
              throw new Error("Invalid employmentInfo format");
            }

            // Check if the object contains only the desired keys
            const allowedKeys = [
              "employmentStatus",
              "profession",
              "professionalLevel",
              "otherNames",
              "email",
            ];
            const actualKeys = Object.keys(value);

            if (!allowedKeys.every((key) => actualKeys.includes(key))) {
              const invalidKeys = actualKeys.filter(
                (key) => !allowedKeys.includes(key)
              );
              throw new Error(
                `Invalid employmentInfo keys: ${invalidKeys.join(", ")}`
              );
            }
          }
        },
      },
    },
    location: {
      allowNull: true,
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    avatarUrl: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
      }
);

//custom method to remove password & otp fields when called
User.prototype.getSanitizedData = function () {
  const user = this.toJSON();
  delete user.password;
  delete user.otpCode;
  return user;
};

export default User;
