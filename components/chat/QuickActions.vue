<script setup lang="ts">
defineProps<{
  actions: string[];
}>();

defineEmits(["select"]);
</script>

<template>
  <div
    class="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-8 justify-center px-4 md:px-6"
  >
    <button
      v-for="(action, index) in actions"
      :key="action"
      @click="$emit('select', action)"
      v-motion
      :initial="{ opacity: 0, y: 15, scale: 0.95 }"
      :enter="{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          delay: 700 + (index * 80),
          duration: 500,
          type: 'spring',
          stiffness: 200,
          damping: 15
        }
      }"
      class="px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-semantic-highlight/40 text-semantic-highlight font-body text-xs md:text-sm transition-all duration-500 hover:border-semantic-highlight hover:bg-semantic-highlight hover:text-semantic-background hover:scale-105 active:scale-95 whitespace-nowrap shadow-sm hover:shadow-md"
    >
      {{ action }}
    </button>
  </div>
</template>
