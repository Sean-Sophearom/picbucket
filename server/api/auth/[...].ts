import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NuxtAuthHandler } from "#auth";
import bcrypt from "bcrypt";
import { userSigninSchema } from "~/utils/validtors";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/auth/signin", error: "/auth/error" },
  callbacks: {
    // Todo - Refactor code if possible
    async signIn({ account, user, credentials, profile }) {
      try {
        const provider = account?.provider as string;

        /**
         * For credentials provider, we don't need to check if user exists / save user to db / update user info
         * as it's already done in the credentials authorizer
         */
        if (provider === "credentials") {
          if (user.is_error) {
            throw new BadRequestError(user.error_message || "Something went wrong. Please try again.");
          }
          return true;
        }

        const email = user.email as string;
        const existingUser = await User.findOne({ email });

        /**
         * If user already exists, aka user has already signin before, we need to check if the user is signing in with the same provider
         * if so we update the user info, if not we throw an error
         * If user doesn't yet exist, we save the user to db
         */
        if (existingUser) {
          if (existingUser.provider === provider) {
            await User.updateOne({ email }, { name: user.name });
            return true;
          } else {
            throw new BadRequestError(`User account with this email already exists. Please sign in with ${existingUser.provider} instead.`);
          }
        } else {
          const newUser = await User.create({
            email,
            name: user.name as string,
            provider,
            image: user.image,
          });

          if (!newUser) {
            throw new InternalServerError("Something went wrong. Please try again.");
          }

          return true;
        }
      } catch (err) {
        if (err instanceof CustomAPIError) {
          throw err;
          // } else if (err instanceof Error) {
          //   console.log("Error when signing user in:", err.message);
          //   throw new InternalServerError("Something went wrong. Please try again.");
        } else {
          console.log("Error when signing user in:", err);
          throw new InternalServerError("Something went wrong. Please try again.");
        }
      }
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.user_id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user_id) {
        session.id = token.user_id as string;
      }

      return session;
    },
  },
  providers: [
    // @ts-expect-error We need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // @ts-expect-error We need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // @ts-expect-error We need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        const makeError = (message?: string) => ({ is_error: true, error_message: message });

        try {
          const validated = await userSigninSchema.safeParseAsync(credentials);

          if (!validated.success) {
            const data = validated.error.errors[0];
            return makeError(data.message);
          }

          const data = validated.data;
          const user = await User.findOne({ email: data.email });

          if (!user) {
            return makeError("User with this email address not found");
          }

          if (user.provider !== "credentials") {
            return makeError(`Please sign in with ${user.provider} instead.`);
          }

          const isValid = await bcrypt.compare(data.password, user.password);

          if (!isValid) {
            return makeError("Invalid password");
          }

          return { email: user.email, name: user.name, id: user.id, is_error: false };
        } catch (error: any) {
          console.log("Error when user logging in:", error.message);
          return makeError();
        }
      },
    }),
  ],
});
