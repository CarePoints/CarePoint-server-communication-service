import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  userId: string; // Added userId
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  phonenumber?: string;
  createdAt?: Date;
  profilePic?: string | null;
}

const UserSchema = new Schema<UserDocument>({
  userId: { type: String, required: true, unique: true }, // Added userId field with unique constraint
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phonenumber: { type: String },
  createdAt: { type: Date, default: Date.now },
  profilePic: { type: String, default: null }
});

export const User = mongoose.model<UserDocument>("User", UserSchema);
