import mongoose from 'mongoose'
import { Schema } from "mongoose";
import { IImage } from "~/types";

const schema = new mongoose.Schema<IImage>({
  name: { type: String, required: true },
  downloadUrl: { type: String, required: true },
  size: { type: Number, required: true },
  timeCreated: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, required: false, ref: "User" },
  expireAt: { type: Date, required: true },
});

export const ImageSchema = mongoose.models.Image || mongoose.model("Image", schema);