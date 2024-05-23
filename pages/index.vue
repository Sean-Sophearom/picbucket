<template>
  <div class="flex flex-col">
    <NuxtLink v-if="!isAuthenticated" to="/auth/signup">
      <button class="text-base">Sign up page</button>
    </NuxtLink>
    <NuxtLink v-if="!isAuthenticated" to="/auth/signin">
      <button class="text-base">Sign in page</button>
    </NuxtLink>
    <button v-if="isAuthenticated" @click="handleSignout">Sign out</button>
  </div>
</template>

<script lang="ts" setup>
const { signOut, status } = useAuth();

const isAuthenticated = computed(() => status.value === "authenticated");

const { toast } = useToast();

const handleSignout = async () => {
  await signOut({
    redirect: false,
  });

  toast({
    title: "Signed out",
    description: "You have been signed out",
  });
};
</script>
