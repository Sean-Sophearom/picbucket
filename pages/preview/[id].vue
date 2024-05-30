<template>
  <UiContainer class="flex flex-col">
    <div>
      <p class="sm:text-xl text-lg font-medium py-2 text-center">Your image has been uploaded successfully!</p>
      <NuxtImg
        :src="data?.url"
        alt="preivew image"
        class="mx-auto max-h-[50vh] h-full border-2 rounded border-dashed border-primary/50 p-2"
      />
    </div>

    <div class="max-w-fit mx-auto w-full">
      <div class="mt-4">
        <p class="text-lg font-medium">Image URL:</p>
        <div
          class="bg-gray-100 p-2 px-4 group pr-8 rounded text-sm overflow-x-auto relative cursor-pointer"
          @click="copyToClipboard(imageSrc)"
          title="Image URL (click to copy)"
        >
          <pre class="overflow-x-auto">{{ imageSrc }}</pre>
          <Icon
            name="ph:clipboard-text"
            size="16"
            class="text-gray-500 absolute right-2 top-2 group-hover:opacity-100 opacity-0 duration-100"
          />
        </div>
      </div>

      <div class="mt-4">
        <p class="text-lg font-medium">HTML Example:</p>
        <div
          class="bg-gray-100 p-2 px-4 group pr-8 rounded text-sm overflow-x-auto relative cursor-pointer"
          @click="copyToClipboard(htmlExample)"
          title="HTML Example (click to copy)"
        >
          <pre class="overflow-x-auto">{{ htmlExample }}</pre>
          <Icon
            name="ph:clipboard-text"
            size="16"
            class="text-gray-500 absolute right-2 top-2 group-hover:opacity-100 opacity-0 duration-100"
          />
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
useHead({
  title: "Image Preview",
});

const router = useRoute();
const imageId = router.params.id as string;
const { toast } = useToast();
const imageSrc = concatImageUrl(imageId);
const htmlExample = `<img src="${imageSrc}" alt="describe your image" />`;

const { data, error, pending } = await useFetch(`/api/image/${imageId}`);

if (error.value) {
  await navigateTo("/404");
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  toast({
    title: "Copied!",
    description: "Text has been copied to clipboard!",
    duration: 5000,
  });
}

definePageMeta({
  layout: "with-nav",
});
</script>
