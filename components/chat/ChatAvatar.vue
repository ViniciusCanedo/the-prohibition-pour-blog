<script setup lang="ts">
interface Props {
  size?: "sm" | "md" | "lg";
}

withDefaults(defineProps<Props>(), {
  size: "md",
});

const sizeClasses = {
  sm: "w-8 h-8 border-[1.5px]",
  md: "w-10 h-10 border-2",
  lg: "w-20 h-20 border-2",
};

const textClasses = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-4xl",
};
</script>

<template>
  <div
    :class="[
      'rounded-full border-2 border-semantic-highlight flex items-center justify-center bg-semantic-highlight/5 flex-shrink-0',
      sizeClasses[size],
    ]"
  >
    <span :class="['font-display text-semantic-highlight', textClasses[size]]"
      >H</span
    >
  </div>
</template>
