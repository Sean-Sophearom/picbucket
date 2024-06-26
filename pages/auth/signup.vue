<template>
  <UiContainer class="flex justify-center items-center min-h-dvh">
    <div class="w-full max-w-[420px]">
      <div class="text-center">
        <h1 class="font-semibold text-2xl lg:text-3xl">Create an account</h1>
        <p class="mt-2 text-lg text-muted-foreground">Start uploading images today!</p>
      </div>
      <form @submit.prevent="onSubmit" class="mt-10">
        <fieldset :disabled="form.isSubmitting.value" class="gap-5 grid">
          <div class="space-y-2">
            <UiFormField v-for="field in formFields" :key="field.name" v-slot="{ componentField }" :name="field.name"
              ><UiFormItem class="space-y-1" v-auto-animate>
                <UiFormLabel :class="{ 'text-muted-foreground': form.isSubmitting.value }">{{ field.label }} *</UiFormLabel>
                <UiFormControl>
                  <UiInput :type="field.type" :placeholder="`Enter your ${field.label}`" v-bind="componentField" />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
          </div>
          <UiAlert v-if="submitError" class="bg-destructive py-3 text-white">
            <UiAlertDescription class="flex items-center">
              {{ submitError }}
            </UiAlertDescription>
          </UiAlert>
          <UiButton type="submit" class="w-full"> Create account </UiButton>
          <UiDivider label="or" />
          <UiButton @click="signUpWithGoogle" type="button" class="flex items-center gap-2 w-full" variant="outline">
            <Icon name="logos:google-icon" /> Sign up with Google
          </UiButton>
          <UiButton @click="signUpWithGithub" type="button" class="flex items-center gap-2 w-full" variant="outline">
            <Icon name="logos:github-icon" /> Sign up with Github
          </UiButton>
        </fieldset>
      </form>
      <p class="mt-10 text-center text-sm">
        Already have an account?
        <NuxtLink class="font-semibold text-primary text-sm hover:underline" to="/auth/signin">Sign in here</NuxtLink>
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, configure } from "vee-validate";
import { vAutoAnimate } from "@formkit/auto-animate/vue";

definePageMeta({
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
  },
});

useHead({
  title: "Sign Up",
});

const submitError = ref<string | null>(null);
const formSchema = toTypedSchema(userSignupSchema);

const form = useForm({
  validationSchema: formSchema,
});

// Enable this if you want to clear the error message when the user changes the input
watch(form.controlledValues, () => {
  submitError.value = null;
});

configure({
  validateOnChange: false,
  validateOnInput: false,
  validateOnModelUpdate: false,
});

const formFields = [
  { name: "name", label: "Username", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];

const { signIn } = useAuth();

const onSubmit = form.handleSubmit(async (values) => {
  // if (submitError.value) return;

  try {
    await $fetch("/api/auth/signup", {
      method: "POST",
      body: values,
    });

    const res = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (res?.error) {
      submitError.value = res.error;
    } else {
      useRouter().replace("/");
    }
    // Todo: Redirect to home page and show sonner/toast
  } catch (err: any) {
    submitError.value = err.data?.message! || "The system is experiencing high load. Please try again later.";
  }
});

// Todo: Handle error when user cancels the sign in in the popup
const signUpWithGoogle = () => signIn("google", { callbackUrl: "/auth/signup" }); // after success only, failing (canceled) is defined in google console
const signUpWithGithub = () => signIn("github", { callbackUrl: "/auth/signup" });
</script>
