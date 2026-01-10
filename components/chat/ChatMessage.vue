<script setup lang="ts">
import { Download } from "lucide-vue-next";

const props = defineProps<{
  role: "assistant" | "user";
  text: string;
  timestamp: string;
  isTyping?: boolean;
}>();

const downloadResponse = () => {
  const blob = new Blob([props.text], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hick-response-${Date.now()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
</script>

<template>
  <div
    class="flex w-full mb-6"
    :class="role === 'assistant' ? 'justify-start' : 'justify-end'"
  >
    <div
      v-motion
      :initial="{ 
        opacity: 0, 
        y: 20, 
        scale: 0.95,
        x: role === 'assistant' ? -10 : 10
      }"
      :enter="{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 260,
          damping: 20
        }
      }"
      class="max-w-[80%] md:max-w-[70%] rounded-2xl border transition-all duration-250 ease-out"
      :class="[
        role === 'assistant'
          ? 'bg-semantic-assistantBubble text-semantic-primaryText border-semantic-border rounded-tl-none p-4 md:p-6'
          : 'bg-semantic-userBubble text-semantic-secondaryText border-semantic-highlight/30 rounded-tr-none py-1 px-4 md:py-3.5 md:px-6',
      ]"
    >
      <div
        v-if="role === 'assistant'"
        class="flex items-center justify-between mb-2 gap-2"
      >
        <div class="flex items-center gap-2">
          <ChatAvatar size="sm" />
          <div class="h-[1px] w-4 bg-semantic-highlight/30"></div>
        </div>
        <button
          v-if="!isTyping && text"
          @click="downloadResponse"
          class="p-1.5 rounded-lg hover:bg-semantic-highlight/10 text-semantic-highlight/60 hover:text-semantic-highlight transition-colors group"
          title="Download response"
        >
          <Download class="w-4 h-4" />
        </button>
      </div>

      <div
        v-if="text"
        class="font-body text-base md:text-lg leading-relaxed prose prose-invert prose-p:leading-relaxed prose-pre:bg-semantic-surface prose-pre:border prose-pre:border-semantic-border prose-pre:rounded-xl max-w-none"
      >
        <MDC :value="text" />
      </div>

      <div
        v-if="isTyping"
        class="flex items-center gap-1.5"
        :class="text ? 'mt-4' : ''"
      >
        <div
          class="w-1.5 h-1.5 bg-semantic-highlight rounded-full animate-bounce"
        ></div>
        <div
          class="w-1.5 h-1.5 bg-semantic-highlight rounded-full animate-bounce [animation-delay:-0.15s]"
        ></div>
        <div
          class="w-1.5 h-1.5 bg-semantic-highlight rounded-full animate-bounce [animation-delay:-0.3s]"
        ></div>
      </div>

      <div
        v-if="!isTyping"
        class="mt-2 text-[10px] opacity-40 font-body uppercase tracking-tighter"
        :class="role === 'assistant' ? 'text-left' : 'text-right'"
      >
        {{ timestamp }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.rounded-tl-none {
  border-top-left-radius: 0;
}
.rounded-tr-none {
  border-top-right-radius: 0;
}

:deep(.prose) {
  @apply text-inherit;
}

:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3),
:deep(.prose h4) {
  @apply font-display text-semantic-highlight mt-6 mb-3 first:mt-0 tracking-wide;
}

:deep(.prose h1) {
  @apply text-2xl md:text-3xl pb-2;
}
:deep(.prose h2) {
  @apply text-xl md:text-2xl;
}
:deep(.prose h3) {
  @apply text-lg md:text-xl;
}

:deep(.prose ul),
:deep(.prose ol) {
  @apply my-4 pl-5 space-y-2;
}

:deep(.prose li) {
  @apply pl-1;
}

:deep(.prose blockquote) {
  @apply border-l-4 border-semantic-highlight/30 pl-4 py-1 my-6 italic text-semantic-primaryText/80 bg-semantic-highlight/5 rounded-r-lg;
}

:deep(.prose table) {
  @apply block w-full overflow-x-auto my-6 text-sm md:text-base rounded-xl border border-semantic-border;
  border-collapse: collapse;
}

:deep(.prose table) {
  min-width: 100%;
}

:deep(.prose table thead),
:deep(.prose table tbody),
:deep(.prose table tr) {
  min-width: 500px;
  display: block;
}

:deep(.prose table tr) {
  display: flex;
}

:deep(.prose th),
:deep(.prose td) {
  @apply border border-semantic-border p-3 text-left flex-1 min-w-[120px];
}

:deep(.prose thead) {
  @apply bg-semantic-highlight/10 text-semantic-highlight uppercase tracking-wider text-xs;
}

:deep(.prose th),
:deep(.prose td) {
  @apply border border-semantic-border p-3 text-left;
}

:deep(.prose tr:nth-child(even)) {
  @apply bg-semantic-surface/30;
}

:deep(.prose strong) {
  @apply text-semantic-highlight font-bold;
}

:deep(.prose a) {
  @apply text-semantic-highlight underline hover:text-semantic-highlight/80 transition-colors;
}

:deep(.prose code) {
  @apply bg-semantic-highlight/10 text-semantic-highlight px-1.5 py-0.5 rounded text-[0.9em] font-mono;
}

:deep(.prose pre) {
  @apply bg-semantic-surface border border-semantic-border rounded-xl p-4 my-6 overflow-x-auto;
}

:deep(.prose pre code) {
  @apply bg-transparent p-0 text-semantic-primaryText text-sm block;
}

:deep(.prose hr) {
  @apply border-semantic-border my-8;
}
</style>
