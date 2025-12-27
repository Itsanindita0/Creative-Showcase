import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    public_id: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
