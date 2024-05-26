export default defineWrappedResponseHandler(async (event) => {
  const imageId = event.context.params?.id;
  const image = await ImageSchema.findById(imageId).catch(() => {
    throw new NotFoundError();
  });

  if (!imageId || !image) {
    throw new NotFoundError();
  }

  // Todo: Add more validation & Implement image deletion logic

  return await sendRedirect(event, image.downloadUrl);
});
