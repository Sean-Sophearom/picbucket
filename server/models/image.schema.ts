import { defineMongooseModel } from "#nuxt/mongoose";
import { IImage } from "~/types";
import { Schema } from "mongoose";

export const ImageSchema = defineMongooseModel<IImage>("Image", {
  name: { type: String, required: false },
  downloadUrl: { type: String, required: false },
  size: { type: Number, required: false },
  timeCreated: { type: Date, required: false },
  user: { type: Schema.Types.ObjectId, required: false, ref: "User" },
  expireAt: { type: Date, required: true },
  isUploading: { type: Boolean, required: true, default: true },
});
