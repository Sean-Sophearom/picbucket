<template>
  <HomepageBG />
  <UiContainer class="flex-[99999] flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Effortless Image Uploading<br />Made for Everyone</h1>
      <p class="mt-6 text-lg leading-8 text-gray-600">Drag and drop your picture here, or Sign Up for extended features.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <NuxtLink :to="isAuthenticated ? '/account' : '/auth/signup'">
          <UiButton>Get Started</UiButton>
        </NuxtLink>
        <button @click="imageUploadStore.open" class="text-sm font-semibold leading-6 text-gray-900">Upload Now →</button>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
const { signOut, status } = useAuth();

const imageUploadStore = useImageUploadStore();
const isAuthenticated = computed(() => status.value === "authenticated");

definePageMeta({
  layout: "with-nav",
  
});
</script>
