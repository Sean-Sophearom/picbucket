<template>
  <footer class="bottom-0 bg-gray-900 mt-8 w-full" aria-labelledby="footer-heading">
    <UiContainer class="mx-auto px-6 lg:px-8 pb-8">
      <div class="md:flex md:justify-between md:items-center border-white/10 pt-8">
        <div class="flex space-x-6 md:order-2">
          <a href="https://github.com/Sean-Sophearom/picbucket" class="text-gray-500 hover:text-gray-400" target="_blank">
            <Icon name="uil:github" class="w-6 h-6" />
          </a>
          <NuxtLink to="/" class="text-gray-500 hover:text-gray-400" v-if="!isHomePage">
            <Icon name="material-symbols:home" class="w-6 h-6" />
          </NuxtLink>

          <button @click="imageUploadStore.open" class="text-gray-500 hover:text-gray-400">
            <Icon name="ph:upload" class="w-6 h-6" />
          </button>
        </div>
        <p class="md:order-1 mt-8 md:mt-0 text-gray-400 text-xs leading-5">© {{ currentYear }} Phearom. All rights reserved.</p>
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
