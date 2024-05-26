import { getServerSession } from "#auth";

const isImage = (file: File) => file.type.startsWith("image/");

export default defineWrappedResponseHandler(async (event) => {
  initFirebase();

  const session = await getServerSession(event);
  let user_id: string | undefined;
  if (session) {
    const user = await User.findOne({ email: session.user?.email });
    user_id = user?._id?.toString();
  }

  const formData = await readFormData(event).catch((_err) => {
    throw new BadRequestError("Please provide a file to upload");
  });

  const file = formData.get("file");
  if (!file || !(file instanceof File) || !isImage(file)) {
    throw new BadRequestError("Please provide a valid image file to upload");
  }

  const { url, snapshot } = await uploadImage(file, file.name);

  await ImageSchema.create({
    ...snapshot.metadata,
    name: file.name,
    downloadUrl: url,
    user: user_id,
  });

  return {
    statusCode: HTTPStatusCodes.CREATED,
    message: "Image uploaded successfully",
  };
});
