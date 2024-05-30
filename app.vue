<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UiToaster />
  <ImageUploaderPopup />
</template>

<script lang="ts" setup>
useHead({
  titleTemplate(title) {
    return title ? `${title} | PicBucket` : "PicBucket";
  },
});
</script>
