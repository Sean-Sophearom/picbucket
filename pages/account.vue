<template>
  <UiContainer>
    <div class="flex justify-center items-center bg-primary/10 gap-8 p-4 relative">
      <UiAvatar size="base" class="sm:hidden border border-primary">
        <UiAvatarImage :src="userImage" :alt="`Avatar of ${username}`" />
        <UiAvatarFallback>{{ userInitial }}</UiAvatarFallback>
      </UiAvatar>
      <UiAvatar size="lg" class="max-sm:hidden border border-primary scale-75">
        <UiAvatarImage :src="userImage" :alt="`Avatar of ${username}`" />
        <UiAvatarFallback>{{ userInitial }}</UiAvatarFallback>
      </UiAvatar>
      <div>
        <p class="text-lg sm:text-xl font-semibold">{{ username }}</p>
        <p class="sm:text-lg">{{ userEmail }}</p>
      </div>
    </div>

    <div class="mt-8">
      <p class="text-lg font-medium">Your Images</p>
      <div v-if="images.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        <div v-for="image in images" :key="image" class="relative group">
          <NuxtLink :to="`/preview/${image}`">
            <NuxtImg :src="concatImageUrl(image)" alt="image" class="w-full h-40 object-cover rounded-lg" />
          </NuxtLink>
          <NuxtLink :to="`/preview/${image}`">
            <div
              class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
            >
              <Icon name="ph:eye" class="text-white" />
            </div>
          </NuxtLink>
        </div>
      </div>
      <p v-if="!images.length" class="text-gray-500 text-center">
        No images found.
        <UiButton @click="imageUploadStore.open" variant="link" class="px-0 underline"> Upload one now </UiButton>
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  layout: "with-nav",
});

const imageUploadStore = useImageUploadStore();
const { data, error } = await useFetch("/api/profile");

if (error.value) {
  await navigateTo("/");
}

const username = data.value?.name as string;
const userImage = data.value?.image as string;
const userInitial = computed(() => username.charAt(0).toUpperCase() + (username.split(" ")?.[1]?.charAt(0)?.toUpperCase() || ""));
const userEmail = data.value?.email as string;
const images = data.value?.images as string[];

useHead({
  title() {
    return `${username}'s Profile`;
  }
})
</script>
