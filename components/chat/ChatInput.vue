<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { Send } from "lucide-vue-next";

const props = defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits(["send"]);
const input = ref("");
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const isMultiLine = ref(false);
const isMaxHeightReached = ref(false);
const baselineHeight = ref(0);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value =
    window.matchMedia("(max-width: 1024px)").matches ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    if (!isMobile.value) {
      e.preventDefault();
      handleSend();
    }
  }
};

const handleSend = () => {
  if (input.value.trim()) {
    emit("send", input.value.trim());
    input.value = "";
    nextTick(() => {
      if (textareaRef.value) {
        textareaRef.value.style.height = "auto";
        isMultiLine.value = false;
        isMaxHeightReached.value = false;
      }
    });
  }
};

const adjustHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    const scrollHeight = textareaRef.value.scrollHeight;

    // Add 4px for border-2 (top + bottom) when using border-box
    textareaRef.value.style.height = `${scrollHeight + 4}px`;

    // Use baseline to determine if we've wrapped or added lines
    if (baselineHeight.value === 0) baselineHeight.value = scrollHeight;

    // More robust multiline detection: if it's significantly larger than baseline or contains newline
    isMultiLine.value =
      input.value.includes("\n") || scrollHeight > baselineHeight.value + 5;
    isMaxHeightReached.value = scrollHeight >= 256;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  if (textareaRef.value) {
    textareaRef.value.focus();
    // Initial measurement
    textareaRef.value.style.height = "auto";
    baselineHeight.value = textareaRef.value.scrollHeight;
    adjustHeight();
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<template>
  <div class="w-full relative group flex items-center">
    <textarea
      v-model="input"
      @keydown="handleKeyDown"
      rows="1"
      placeholder="Pergunte ao Hick..."
      :disabled="disabled"
      class="w-full bg-semantic-surface text-semantic-primaryText font-body text-base md:text-lg border-2 border-semantic-assistantBubble focus:border-semantic-highlight focus:outline-none rounded-2xl py-3 md:py-3.5 pl-4 md:pl-6 pr-12 md:pr-14 transition-all duration-200 placeholder:text-semantic-secondaryText/20 resize-none shadow-2xl leading-normal max-h-[256px] disabled:opacity-50 disabled:cursor-not-allowed"
      :class="[
        isMaxHeightReached
          ? 'overflow-y-auto custom-scrollbar'
          : 'overflow-hidden',
      ]"
      ref="textareaRef"
      @input="adjustHeight"
    ></textarea>

    <button
      @click="handleSend"
      :disabled="!input.trim() || disabled"
      class="absolute right-2 md:right-3 bg-semantic-highlight text-semantic-background p-2 md:p-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:grayscale disabled:hover:scale-100 flex items-center justify-center"
      :class="[
        isMultiLine ? 'bottom-2 md:bottom-3' : 'inset-y-0 my-auto h-fit',
      ]"
    >
      <Send class="w-4 h-4 md:w-5 md:h-5" stroke-width="3" />
    </button>
  </div>
</template>
