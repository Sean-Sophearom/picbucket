import type { z } from "zod";
import type { userSigninSchema, userSignupSchema } from "~/utils/validtors";

export type UserSignup = z.infer<typeof userSignupSchema>;
export type UserSignin = z.infer<typeof userSigninSchema>;

interface BaseUser {
  name: string;
  email: string;
  image?: string;
  provider: "credentials" | "google" | "github";
}

interface CredentialsUser extends BaseUser {
  provider: "credentials";
  password: string;
}

interface OtherProviderUser extends BaseUser {
  provider: "google" | "github";
  password?: string;
}

export type IUser = CredentialsUser | OtherProviderUser;

export interface IImage {
  name: string;
  downloadUrl: string;
  size: number;
  timeCreated: Date;
  user?: string;
  expireAt: Date;
  isUploading: boolean;
}
