import { defineMongooseModel } from "#nuxt/mongoose";
import { IUser } from "~/types";

export const User = defineMongooseModel<IUser>("User", {
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
