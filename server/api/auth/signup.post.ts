import { userSignupSchema } from "~/utils/validtors";
import bcrypt from "bcrypt";

export default defineWrappedResponseHandler(async (event) => {
  const body = await readBody(event);

  const validated = await userSignupSchema.safeParseAsync(body);
  if (!validated.success) {
    const error = validated.error.errors[0];
    throw new BadRequestError(error.message);
  }

  const data = validated.data;

  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    const messageEnding = existingUser.provider === "credentials" ? "" : " instead";
    throw new BadRequestError(`User account with this email already exists. Please sign in with ${existingUser.provider}${messageEnding}.`);
  }

  const hasedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    email: data.email,
    password: hasedPassword,
    name: data.name,
    provider: "credentials",
  });

  return {
    message: "User created successfully",
    statusCode: HTTPStatusCodes.CREATED,
  };
});
