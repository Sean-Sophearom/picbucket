export default defineWrappedResponseHandler(async (event) => {
  const imageId = event.context.params?.id as string;

  let image = await ImageSchema.findById(imageId).catch(() => {
    throw new NotFoundError("Image not found");
  });

  if (!imageId || !image) {
    throw new NotFoundError("Image not found");
  }

  while (image.isUploading) {
    await sleep(1000);
    image = await ImageSchema.findById(imageId).catch(() => {
      throw new NotFoundError("Image not found");
    });
  }

  return {
    url: image.downloadUrl as string,
    name: image.name,
    statusCode: HTTPStatusCodes.OK,
  };
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));