<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import { type ButtonVariants, buttonVariants } from ".";
import { cn } from "@/lib/utils";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  isLoading: false,
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(buttonVariants({ variant, size }), props.class)">
    <slot v-if="!isLoading" />
    <div v-else class="flex items-center justify-center space-x-2">
      <Icon name="svg-spinners:180-ring-with-bg" class="" />
      <span>Loading...</span>
    </div>
  </Primitive>
</template>
