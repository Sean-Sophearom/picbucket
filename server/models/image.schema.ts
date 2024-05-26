import { defineMongooseModel } from "#nuxt/mongoose";
import { Schema } from "mongoose";
import { IImage } from "~/types";

export const ImageSchema = defineMongooseModel<IImage>("Image", {
  name: { type: String, required: true },
  downloadUrl: { type: String, required: true },
  size: { type: Number, required: true },
  timeCreated: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, required: false, ref: "User" },
});
