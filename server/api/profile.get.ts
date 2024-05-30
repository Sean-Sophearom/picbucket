import { getServerSession } from "#auth";
import { concatImageUrl } from "~/utils";

export default defineWrappedResponseHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session) {
    throw new UnauthorizedError("You must be logged in to view this page");
  }

  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    throw new InternalServerError("User not found");
  }

  const images = await ImageSchema.find(
    { user: user._id },
    {
      id: 1,
    }
  );

  const imageIds = images.map((i) => i.id);

  return {
    message: "Profile fetched successfully",
    images: imageIds,
    statusCode: HTTPStatusCodes.OK,
    image: session.user?.image as string,
    name: session.user?.name as string,
    email: session.user?.email as string,
  };
});
