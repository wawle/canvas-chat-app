import mongoose, { Schema, Document } from "mongoose";

// Chat mesajı için interface
export interface IMessage extends Document {
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
}

// Chat oturumu için interface
export interface IChat extends Document {
  title: string;
  messages: IMessage[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Kullanıcı için interface
export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
}

// Message şeması
const MessageSchema = new Schema<IMessage>({
  role: { type: String, required: true, enum: ["user", "assistant", "system"] },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Chat şeması
const ChatSchema = new Schema<IChat>({
  title: { type: String, required: true },
  messages: [MessageSchema],
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Kullanıcı şeması
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Models
export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export const Chat =
  mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);

// Doğrudan mesaj modelini dışa aktarmaya gerek yok çünkü Chat içinde kullanılıyor
