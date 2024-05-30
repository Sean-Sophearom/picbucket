/**
 *
 * @param imageId the id of the image from mongoDB
 * @returns the full image url
 */
export const concatImageUrl = (imageId: string) => {
  const { public: publicRuntimeConfig } = useRuntimeConfig();
  return `${publicRuntimeConfig.BASE_URL}/images/${imageId}`;
};
