import mongoose, { models, Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    residentialAddress: { type: String },
    cart: { type: Array<String>, default: [] },
    saved_items: { type: Array<String>, default: [] },
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model("User", UserSchema);
