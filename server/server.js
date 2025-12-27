import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";


import authRoutes from "./routes/auth.js";
import imageRoutes from "./routes/images.js";
import userRoutes from "./routes/user.js";

//  Loading env AFTER import


const app = express();

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Creative Showcase Backend Running 🚀");
});

console.log("JWT:", process.env.JWT_SECRET);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

  })
  .catch((err) => console.log(err));
