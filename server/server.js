import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { entriesModel } from "./models/entriesModel.js";
import { userModel } from "./models/userModel.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "dickens_omondi";

mongoose.connect("mongodb://localhost:27017/journal-db");

//create new entry
app.post("/api/new_entry", (req, res) => {
  entriesModel
    .create(req.body)
    .then((entries) => res.json(entries))
    .catch((err) => res.json(err));
});

app.get("/", (req, res) => {
  res.send("No data");
  console.log("no data in db..");
});

//create new user
app.post("/api/auth", (req, res) => {
  userModel
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

//login the user
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && user.password === password) {
    console.log("creating token");
    const token = jwt.sign({ email }, SECRET, { expiresIn: "2h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials!" });
  }
});
app.listen(4000, () => {
  console.log("Server is live on port 4000");
});
