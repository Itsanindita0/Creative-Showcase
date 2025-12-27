import express from "express";
import User from "../models/User.js";
import Image from "../models/Image.js";

const router = express.Router();

router.get("/:username/images", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).json("User not found");

  const images = await Image.find({ user: user._id });
  res.json(images);
});

export default router;
