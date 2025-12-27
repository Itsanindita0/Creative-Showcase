import express from "express";
import cloudinary from "../config/cloudinary.js";
import upload from "../config/multer.js";
import Image from "../models/Image.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//uploading image
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    // Uploading to Cloudinary using a stream
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "creative_showcase" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await uploadToCloudinary();

    const image = new Image({
      user: req.user.id,
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });

    await image.save();
    res.status(201).json(image);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ msg: "Upload failed" });
  }
});

//get my uploads
router.get("/my", auth, async (req, res) => {
  try {
    const images = await Image.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error("FETCH MY IMAGES ERROR:", err);
    res.status(500).json({ msg: "Failed to fetch images" });
  }
});

//for deleting an image
router.delete("/:id", auth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ msg: "Image not found" });

    if (image.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Unauthorized" });

    await cloudinary.uploader.destroy(image.public_id);
    await image.deleteOne();
    res.json({ msg: "Image deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ msg: "Failed to delete image" });
  }
});

//get random images

router.get("/random", async (req, res) => {
  try {
    const images = await Image.aggregate([{ $sample: { size: 20 } }]);
    res.json(images);
  } catch (err) {
    console.error("RANDOM FETCH ERROR:", err);
    res.status(500).json({ msg: "Failed to fetch images" });
  }
});

//get images by username
router.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const images = await Image.find({ user: user._id }).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error("USER IMAGES ERROR:", err);
    res.status(500).json({ msg: "Failed to fetch user's images" });
  }
});

export default router;
