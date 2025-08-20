import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {entriesModel} from "./models/entriesModel.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/journal-db");

app.post("/api/new_entry", (req, res) => {
  entriesModel   
    .create(req.body)
    .then((entries) => res.json(entries))
    .catch((err) => res.json(err));
  console.log("saved!");       
});  

app.get("/", (req, res) => {
  res.send("No data");
  console.log("no data in db..");
});

app.listen(4000, () => {
  console.log("Server is live on port 4000");
});
