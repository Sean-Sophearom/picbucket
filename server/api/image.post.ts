export default defineWrappedResponseHandler(async (event) => {
  initFirebase();

  const formData = await readFormData(event).catch((_err) => {
    throw new BadRequestError("Please provide a file to upload");
  });

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    throw new BadRequestError("Please provide a file to upload");
  }

  const { url } = await uploadImage(file, `images/${file.name}`);

  return {
    statusCode: HTTPStatusCodes.CREATED,
    message: "Image uploaded successfully",
  };
});
