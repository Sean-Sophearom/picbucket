<template>
  <Primitive :class="base({ class: props.class, underline, type })" v-bind="reactiveOmit(props, 'class')">
    <NuxtLink to="/" v-if="props.link">
      <span :class="first({ type })">Pic</span>
      <span :class="second({ type })">Bucket</span>
    </NuxtLink>
    <template v-else>
      <span :class="first({ type })">Pic</span>
      <span :class="second({ type })">Bucket</span>
    </template>
  </Primitive>
</template>

<script lang="ts" setup>
import { Primitive } from "radix-vue";
import type { PrimitiveProps } from "radix-vue";

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      class?: any;
      type?: VariantProps<typeof style>["type"];
      underline?: VariantProps<typeof style>["underline"];
      link?: boolean;
    }
  >(),
  {
    as: "span",
    link: true,
  }
);

const style = tv({
  slots: {
    base: "decoration-primary",
    first: "",
    second: "",
  },
  variants: {
    type: {
      black: {
        base: "text-black decoration-black",
      },
      mixed: {
        first: "text-black",
        second: "text-primary",
      },
      color: {
        base: "text-primary decoration-primary",
      },
    },
    underline: {
      yes: {
        base: "underline",
      },
      no: {
        base: "",
      },
    },
  },
  defaultVariants: {
    type: "mixed",
    underline: "no",
  },
});

const { base, first, second } = style();
</script>
