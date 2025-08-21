import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userModel } from "./models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { journalModel } from "./models/journalModel.js";

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "dickens_omondi";
const SALT_ROUNDS = 10;

mongoose.connect("mongodb://localhost:27017/journal-db");

//create new entry
app.post(`/api/new_entry/:id`, (req, res) => {
  const userId = req.params.id;
  const { title, mood, location, tags, content } = req.body;
  if (!title || !location || !tags || !content) {
    res.status(401).json({ error: "Fill in all fields!" });
    return;
  }

  journalModel
    .create({
      title,
      mood,
      location,
      tags,
      content,
      createdAt: new Date(),
      user_id: userId,
    })
    .then((journals) => res.json(journals))
    .catch((err) => res.json(err));
});

//protected route
app.get("/api/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      console.log("user not found");
      return res.status(404).json({ error: "User not found in DB!" });
    }

    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    if (!token) {
      console.log("empty token");
      return res.status(401).json({ error: "No token provided" });
    }

    let success = false;
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        console.log("error verifying token", err);
        return res.status(401).json({ error: "Invalid token !" });
      } else {
        success = true;
      }
    });
    if (success) {
      console.log("token verified successfully");
      const userJournals = await journalModel.find({ user_id: userId });
      return res.json({ name: user.full_name, data:userJournals });
    }
  } catch (err) {
    console.log("Error: ", err);
    res
      .status(500)
      .json({ message: "Internal server error, this is not your fault!" });
  }
});

//create new user
app.post("/api/auth", async (req, res) => {
  const { full_name, email, phone_number, password } = req.body;
  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

  userModel
    .create({
      full_name,
      email,
      phone_number,
      password: hashPassword,
      joinedAt: new Date(),
    })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

//login the user
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const hashedPassword = user?.password;
  const isCorrectPassword = bcrypt.compareSync(password, hashedPassword);

  if (isCorrectPassword) {
    const token = jwt.sign({ email }, SECRET, { expiresIn: "2h" });
    res.json({ userId: user._id, name: user.full_name, token: token });
  } else {
    res.status(401).json({ error: "Invalid credentials!" });
  }
});
app.listen(4000, () => {
  console.log("Server is live on port 4000");
});
