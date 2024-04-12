import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  isVerified: boolean;
  verfiyCode: string;
  verfiyCodeExpiry: Date;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "is not valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    default: false,
    type: Boolean,
  },
  verfiyCode: {
    type: String,
    required: true,
  },
  verfiyCodeExpiry: {
    type: Date,
    required: true,
  },
  messages: [MessageSchema],
});

const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

  export default userModel
