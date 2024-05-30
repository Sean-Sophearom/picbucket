import mongoose from 'mongoose'
import { Schema } from "mongoose";
import { IImage } from "~/types";

const schema = new mongoose.Schema<IImage>({
  name: { type: String, required: false },
  downloadUrl: { type: String, required: false },
  size: { type: Number, required: false },
  timeCreated: { type: Date, required: false },
  user: { type: Schema.Types.ObjectId, required: false, ref: "User" },
  expireAt: { type: Date, required: true },
  isUploading: { type: Boolean, required: true, default: true } 
});

export const ImageSchema = mongoose.models.Image || mongoose.model("Image", schema);