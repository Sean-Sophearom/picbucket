import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Custom Field returned from credentials authorizer
   */
  interface User extends DefaultUser {
    is_error?: boolean;
    error_message?: string;
  }

  interface Session extends DefaultSession {
    id: string;
  }
}
