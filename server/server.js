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

//protected route
app.get("/api/user/:id", (req, res) => {
  console.log('hellow');
  const userId = req.params.id

  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split("")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(401).json({ error: "Invalid token !" });
  });
//   res.json({ message: "Welcome to your account" });
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
    const token = jwt.sign({ email }, SECRET, { expiresIn: "2h" });
    res.json({ name: user.full_name, token: token });
  } else {
    res.status(401).json({ error: "Invalid credentials!" });
  }
});
app.listen(4000, () => {
  console.log("Server is live on port 4000");
});
