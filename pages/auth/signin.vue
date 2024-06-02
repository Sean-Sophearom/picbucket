<template>
  <UiContainer class="flex justify-center items-center min-h-dvh">
    <div class="w-full max-w-[420px]">
      <div class="text-center">
        <h1 class="font-semibold text-2xl lg:text-3xl">Welcome Back to <UiLogo type="color" underline="yes" />!</h1>
        <p class="mt-2 text-lg text-muted-foreground">Sign in to your account</p>
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
          <UiButton type="submit" class="w-full"> Sign in </UiButton>
          <UiDivider label="or" />
          <UiButton @click="signInWithGoogle" type="button" class="flex items-center gap-2 w-full" variant="outline">
            <Icon name="logos:google-icon" /> Sign in with Google
          </UiButton>
          <UiButton @click="signInWithGithub" type="button" class="flex items-center gap-2 w-full" variant="outline">
            <Icon name="logos:github-icon" /> Sign in with Github
          </UiButton>
        </fieldset>
      </form>
      <p class="mt-10 text-center text-sm">
        No account yet?
        <NuxtLink class="font-semibold text-primary text-sm hover:underline" to="/auth/signup">Sign up here</NuxtLink>
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
  title: "Sign In",
});

const submitError = ref<string | null>(null);
const formSchema = toTypedSchema(userSigninSchema);

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
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];

const { signIn } = useAuth();

const onSubmit = form.handleSubmit(async (values) => {
  // if (submitError.value) return;

  try {
    const res = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (res?.error) {
      submitError.value = res.error;
    } else {
      useRouter().replace("/");
    }
  } catch (err: any) {
    submitError.value = err.data?.message! || "The system is experiencing high load. Please try again later.";
  }
});

// Todo: Handle error when user cancels the sign in in the popup
const signInWithGoogle = () => signIn("google", { callbackUrl: "/auth/signup" }); // after success only, failing (canceled) is defined in google console
const signInWithGithub = () => signIn("github", { callbackUrl: "/auth/signup" });
</script>
