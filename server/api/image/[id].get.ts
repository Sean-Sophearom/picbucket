export default defineWrappedResponseHandler(async (event) => {
  const imageId = event.context.params?.id as string;

  const image = await ImageSchema.findById(imageId).catch(() => {
    throw new NotFoundError("Image not found");
  });

  if (!imageId || !image) {
    throw new NotFoundError("Image not found");
  }

  return {
    // url: image.downloadUrl,
    name: image.name,
    statusCode: HTTPStatusCodes.OK,
  };
});
