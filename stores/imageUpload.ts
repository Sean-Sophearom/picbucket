const truncateText = (text: string, length: number) => (text.length > length ? `${text.slice(0, length)}...` : text);

export const useImageUploadStore = defineStore("imageUpload", () => {
  const isDragging = ref(false);
  const file = ref<File | null>(null);
  const autoDeleteIn = ref("1");
  const isSubmitting = ref(false);

  const { toast } = useToast();

  const getFileName = computed(() => {
    const name = file.value ? file.value.name.split(".").slice(0, -1).join("") : "";
    return (maxLength: number) => (file.value ? truncateText(name, maxLength) : "");
  });

  const fileExtension = computed(() => (file.value ? file.value.name.split(".").pop() : ""));

  const setImage = (files?: FileList | null) => {
    const validated = imageUploadSchema.safeParse(files?.[0]);

    if (!validated.success) {
      toast({
        title: "Invalid image file",
        description: validated.error.errors[0].message,
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    file.value = validated.data;
  };

  const close = () => {
    isDragging.value = false;
    setTimeout(() => {
      file.value = null;
    }, 200);
  };

  const open = () => {
    isDragging.value = true;
  };

  const submitImage = async () => {
    if (!file.value) {
      return toast({
        title: "No image selected",
        description: "Please select an image to upload",
      });
    }

    const formData = new FormData();
    formData.append("file", file.value);
    formData.append("autoDeleteIn", autoDeleteIn.value);

    isSubmitting.value = true;
    try {
      const res = await $fetch("/api/image", {
        method: "POST",
        body: formData,
      });

      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully",
        duration: 5000,
      });

      close();
      return await navigateTo(`/preview/${res.id}`);
    } catch (error: any) {
      const message = error?.data.message;

      toast({
        title: "Image upload failed",
        description: message || "An error occurred while uploading the image. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    isDragging,
    file,
    getFileName,
    fileExtension,
    autoDeleteIn,
    isSubmitting,
    close,
    open,
    setImage,
    submitImage,
  };
});
