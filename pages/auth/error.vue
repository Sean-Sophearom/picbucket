<template>
  <UiContainer class="flex items-center justify-center pt-4">
    <div class="w-full max-w-[380px]">
      <UiNotfoundSVG class="h-[300px] w-[300px] mx-auto" />
      <p class="text-center my-8 text-lg font-semibold">{{ error }}</p>
      <NuxtLink to="/auth/signin">
        <UiButton class="w-full mb-2"> Sign In </UiButton>
      </NuxtLink>
      <NuxtLink to="/">
        <UiButton class="w-full" variant="outline"> Go Back to Home Page </UiButton>
      </NuxtLink>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "with-nav",
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
  },
});

useHead({
  title: "Error",
});

const { error } = useRoute().query;
if (!error) {
  useRouter().push("/");
}
</script>
