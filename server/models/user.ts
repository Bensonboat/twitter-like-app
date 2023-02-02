import mongoose from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  followers: string[];
  following: string[];
  description: string;
  profileProfile: string;
  profilePicture: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers: [{ type: String }],
    following: [{ type: String }],
    description: { type: String },
    profilePicture: { type: String },
    profileProfile: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
