<script setup lang="ts">
import type { NuxtError } from "#app";
const props = defineProps({
  error: Object as () => NuxtError,
});

const message = computed(() => {
  if (props.error?.statusCode === 404) {
    return "The resource you're looking for cannot be found.";
  } else if (props.error?.statusCode === 429) {
    return "You have made too many requests. Please try again in 2 minutes.";
  }
  return "Something went wrong! Please try again later. :(";
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <NuxtLayout name="with-nav">
    <UiContainer class="flex items-center justify-center pt-4">
      <div class="w-full max-w-[380px]">
        <UiNotfoundSVG class="h-[300px] w-[300px] mx-auto" />
        <p class="text-center my-8 text-lg font-semibold">{{ message }}</p>
        <UiButton class="w-full" @click="handleError"> Go Back to Home Page </UiButton>
      </div>
    </UiContainer>
  </NuxtLayout>
</template>
