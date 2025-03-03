import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verifyToken: { type: String },
    verifyTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
