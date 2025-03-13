import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema(
  {
    problem: {
      type: String,
      required: true,
      enum: ["road", "electricity", "fire", "water","sanitary"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "resolved", "ongoing"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Issue = mongoose.model("Issue", IssueSchema);

export default Issue;
