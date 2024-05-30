import mongoose from "mongoose";
import { IUser } from "~/types";

const schema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: String,
  password: {
    type: String,
    required: [
      function (this: any) {
        return this.provider === "credentials";
      },
      "Password is required when signing up with credentials",
    ],
  },
  provider: {
    type: String,
    enum: ["credentials", "google", "github"],
  },
});

export const User = mongoose.models.User || mongoose.model("User", schema);
