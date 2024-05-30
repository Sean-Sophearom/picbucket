import { getServerSession } from "#auth";
import { autoDeleteInOptions } from "~/utils/constant";
import { imageUploadSchema } from "~/utils/validtors";
import mongoose from "mongoose";

export default defineWrappedResponseHandler(async (event) => {
  initFirebase();

  // get user from session if available to save as owner of image
  const session = await getServerSession(event);
  let user_id: string | undefined;
  if (session) {
    const user = await User.findOne({ email: session.user?.email });
    user_id = user?._id?.toString();
  }

  // read body formdata and get file and autoDeleteIn
  const formData = await readFormData(event).catch((_err) => {
    throw new BadRequestError("Please provide a file to upload");
  });
  const file = formData.get("file");
  const autoDeleteIn = formData.get("autoDeleteIn");

  // validate image file
  const validated = imageUploadSchema.safeParse(file);
  if (validated.error) {
    const message = validated.error.errors[0].message;
    throw new BadRequestError(message);
  }

  //validate autoDeleteIn
  const matchDeleteTime = autoDeleteInOptions.find((option) => option.value === autoDeleteIn);
  const requireAuth = matchDeleteTime?.requireAuth;
  const validAutoDeleteIn = !!matchDeleteTime && (requireAuth ? !!user_id : true); // if requireAuth is true, user_id must be present
  if (!validAutoDeleteIn) {
    throw new BadRequestError("Something went wrong. Please try again.");
  }

  const expireAt = new Date();
  if (autoDeleteIn === "0") {
    expireAt.setFullYear(9999);
  } else {
    expireAt.setMonth(expireAt.getMonth() + Number(autoDeleteIn));
  }

  const validatedFile = validated.data;

  const imageId = new mongoose.Types.ObjectId();

  uploadImage(validatedFile, validatedFile.name).then(async ({ snapshot, url }) => {
    await ImageSchema.findByIdAndUpdate(imageId, {
      downloadUrl: url,
      size: snapshot.metadata.size,
      timeCreated: snapshot.metadata.timeCreated,
      name: snapshot.metadata.name,
      isUploading: false,
    });
  });

  const newImage = await ImageSchema.create({
    // ...snapshot.metadata,
    // downloadUrl: url,
    user: user_id,
    expireAt,
    _id: imageId,
  });

  return {
    message: "Image uploaded successfully",
    id: imageId.toString(),
    statusCode: HTTPStatusCodes.CREATED,
  };
});
