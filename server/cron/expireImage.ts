import { defineCronHandler } from "#nuxt/cron";

export default defineCronHandler("daily", async () => {
  try {
    initFirebase();
    await connectDB();
    const expiredImages = await ImageSchema.find({ expireAt: { $lt: new Date() } });

    await Promise.all(expiredImages.map((image) => deleteImage(image.name)));
    await ImageSchema.deleteMany({ expireAt: { $lt: new Date() } });

    if (expiredImages.length) console.log("Cron: Deleted expired images, count:", expiredImages.length);
    else console.log("Cron: No expired images found");
  } catch (error) {
    console.error("Cron: Error deleting expired images", error);
  }
});
