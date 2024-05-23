<template>
  <Head>
    <title>Error | PicBucket</title>
  </Head>
  <UiContainer class="flex items-center justify-center min-h-dvh">
    <div class="w-full max-w-[380px]">
      <NuxtImg src="/not-found.svg" alt="Error" width="300" height="300" />
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
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
  },
});

const { error } = useRoute().query;
if (!error) {
  useRouter().push("/");
}
</script>
