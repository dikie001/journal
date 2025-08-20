import mongoose from "mongoose";
const entriesSchema = new mongoose.Schema({
  title: String,
  mood: String, 
  date: String,
  tags: [],
  location: String,
  content: String,
});

export const entriesModel = mongoose.model("entries", entriesSchema);
 