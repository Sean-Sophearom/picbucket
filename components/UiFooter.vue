<template>
  <footer class="bottom-0 w-full bg-gray-900 mt-8" aria-labelledby="footer-heading">
    <UiContainer class="mx-auto px-6 pb-8 lg:px-8">
      <div class="border-white/10 pt-8 md:flex md:items-center md:justify-between">
        <div class="flex space-x-6 md:order-2">
          <a href="https://github.com/Sean-Sophearom/picbucket" class="text-gray-500 hover:text-gray-400" target="_blank">
            <Icon name="uil:github" class="h-6 w-6" />
          </a>
          <NuxtLink to="/" class="text-gray-500 hover:text-gray-400" v-if="!isHomePage">
            <Icon name="material-symbols:home" class="h-6 w-6" />
          </NuxtLink>

          <button @click="imageUploadStore.open" class="text-gray-500 hover:text-gray-400">
            <Icon name="ph:upload" class="h-6 w-6" />
          </button>
        </div>
        <p class="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">© {{ currentYear }} Phearom. All rights reserved.</p>
      </div>
    </UiContainer>
  </footer>
</template>

<script lang="ts" setup>
const imageUploadStore = useImageUploadStore();
const route = useRoute();

const currentYear = new Date().getFullYear();

const isHomePage = route.path === "/";
</script>
