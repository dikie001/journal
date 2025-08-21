import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  full_name: String,
  email: String,
  phone_number: Number,
  password: String,
  joinedAt:Date,
});

export const userModel = mongoose.model("users", userSchema);
