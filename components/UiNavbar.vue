<template>
  <UiContainer as="nav" class="flex justify-between items-center py-6">
    <UiLogo type="mixed" class="text-2xl md:text-3xl font-semibold" />

    <div class="flex items-center gap-6">
      <div class="underline font-medium"><PricingLink class="hidden sm:block" /></div>

      <NuxtLink v-if="!isAuthenticated" to="/auth/signin">
        <UiButton> Sign In </UiButton>
      </NuxtLink>

      <UiNavAvatar v-else :user-image :username :user-initial />
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
const { status, getSession } = useAuth();
const isAuthenticated = computed(() => status.value === "authenticated");

const sessions = await getSession();

const userImage = computed(() => sessions?.user?.image || "");
const username = computed(() => sessions?.user?.name || "");
const userInitial = computed(
  () => username.value.charAt(0).toUpperCase() + (username.value.split(" ")?.[1]?.charAt(0)?.toUpperCase() || "")
);
</script>
