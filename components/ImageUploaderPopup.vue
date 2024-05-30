<template>
  <div
    ref="outerContainerRef"
    @click="handleClickOutside"
    :class="`fixed z-10 h-screen w-full bg-black/20 transition-all duration-200 top-0 left-0 ${activeClass}`"
  >
    <div class="absolute inset-0 backdrop-blur-[3px] -z-10" />

    <UiContainer class="flex items-center justify-center h-full">
      <div class="p-8 md:p-12 bg-white w-full max-w-4xl relative rounded" ref="innerContainerRef">
        <input type="file" accept="image/*" @change="handleFileChange" class="hidden" ref="input" />
        <UiButton
          @click="imageUploadStore.close"
          class="absolute top-0 right-0 md:right-1 md:top-1 hover:bg-inherit hover:text-gray-500"
          variant="ghost"
        >
          <Icon name="ph:x" class="" />
        </UiButton>
        <div class="relative border-2 border-primary/60 rounded border-dashed bg-white flex flex-col items-center w-full py-24">
          <Icon name="ph:image-thin" size="102" class="text-gray-400 scale-75 sm:scale-100" />
          <template v-if="!imageUploadStore.file">
            <p class="text-center px-2 font-medium text-gray-500 sm:text-lg mt-4">Drag and drop your image here or</p>
            <UiButton @click="input?.click()" class="mt-4">
              <Icon name="ph:upload" class="mr-2" />
              <span> Select Image </span>
            </UiButton>
            <p class="absolute bottom-2 md:bottom-3 text-sm text-gray-500">up to 5MB</p>
          </template>
          <template v-else>
            <p class="text-center px-2 font-medium text-gray-500 sm:text-lg mt-4 overflow-hidden text-ellipsis">
              <span>{{ imageUploadStore.getFileName(24) }}</span>
              <span>.</span>
              <span>{{ imageUploadStore.fileExtension }}</span>
            </p>
            <div class="flex flex-col sm:flex-row sm:items-center mt-4 gap-2">
              <p class="text-gray-500 flex items-center">
                <UiHoverCard :open-delay="100" :close-delay="100">
                  <UiHoverCardTrigger>
                    <Icon name="mdi:information-variant-circle-outline" size="20" class="mr-1 cursor-pointer -translate-y-0.5" />
                  </UiHoverCardTrigger>
                  <UiHoverCardContent class="w-72 z-20">
                    <p class="text-sm" v-if="isAuthenticated">
                      <span class="font-semibold">Your image</span> will automatically be deleted after the specified time.
                    </p>

                    <p class="text-sm" v-else>
                      <span class="font-semibold underline">
                        <NuxtLink to="/auth/signin" @click="imageUploadStore.close">Sign in</NuxtLink>
                      </span>
                      to enable longer duration or disable auto delete.
                    </p>
                  </UiHoverCardContent>
                </UiHoverCard>
                Delete In:
              </p>
              <UiSelect v-model="imageUploadStore.autoDeleteIn">
                <UiSelectTrigger class="w-[180px]">
                  <UiSelectValue />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectGroup>
                    <UiSelectItem v-for="option in autoDeleteOptions" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </UiSelectItem>
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
            </div>
            <UiButton
              @click="imageUploadStore.submitImage"
              class="absolute bottom-3 md:bottom-4"
              :is-loading="imageUploadStore.isSubmitting"
            >
              <Icon name="ph:upload" class="mr-2" /> <span> Submit </span>
            </UiButton>
          </template>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
const input = ref<HTMLInputElement | null>(null);
const outerContainerRef = ref<HTMLDivElement | null>(null);
const innerContainerRef = ref<HTMLDivElement | null>(null);
const imageUploadStore = useImageUploadStore();
const { status } = useAuth();

const isAuthenticated = computed(() => status.value === "authenticated");

const autoDeleteOptions = computed(() => {
  if (isAuthenticated.value) return autoDeleteInOptions;
  return autoDeleteInOptions.filter((option) => !option.requireAuth);
});

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault();

  // check if type is file, if so set isdragging to true
  if (event.dataTransfer?.types[0] === "Files") {
    imageUploadStore.isDragging = true;
  }
};

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault();
  // imageUploadStore.isDragging = false;
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  // imageUploadStore.isDragging = false;
  const files = event.dataTransfer?.files;
  imageUploadStore.setImage(files);
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  //@ts-expect-error
  event.dataTransfer.dropEffect = "copy";
};

const activeClass = computed(() => {
  return imageUploadStore.isDragging ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none";
});

onMounted(() => {
  window.addEventListener("dragenter", handleDragEnter);
  window.addEventListener("dragleave", handleDragLeave);
  window.addEventListener("dragover", handleDragOver);
  window.addEventListener("drop", handleDrop);
});

onUnmounted(() => {
  window.removeEventListener("dragenter", handleDragEnter);
  window.removeEventListener("dragleave", handleDragLeave);
  window.removeEventListener("dragover", handleDragOver);
  window.removeEventListener("drop", handleDrop);
});

const handleClickOutside = (event: MouseEvent) => {
  if (outerContainerRef.value && innerContainerRef.value) {
    if (outerContainerRef.value.contains(event.target as Node) && !innerContainerRef.value.contains(event.target as Node)) {
      imageUploadStore.close();
    }
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  imageUploadStore.setImage(target.files);
};
</script>
