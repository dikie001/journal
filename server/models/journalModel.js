import mongoose from "mongoose";
const dataSchema = new mongoose.Schema({
  user_id: String,
  title: String,
  createdAt: Date,
  mood: String,
  location: String,
  tags: [],
  content: String,
});

export const journalModel = mongoose.model("journals", dataSchema);
