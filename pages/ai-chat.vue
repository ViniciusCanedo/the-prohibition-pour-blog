<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from "vue";
import { useChatStore } from "~/stores/chat";
import { useHead } from "#imports";
import { ArrowLeft, MessageSquarePlus } from "lucide-vue-next";
import ChatHeader from "~/components/chat/ChatHeader.vue";
import ChatMessage from "~/components/chat/ChatMessage.vue";
import ChatInput from "~/components/chat/ChatInput.vue";
import QuickActions from "~/components/chat/QuickActions.vue";

const chatStore = useChatStore();
const chatBodyRef = ref<HTMLElement | null>(null);

const isInitial = computed(() => chatStore.messages.length === 0);

useHead({
  title: computed(() =>
    isInitial.value ? "Hick | Seu Bartender Digital" : "Hick | Chat"
  ),
  bodyAttrs: {
    class: computed(() =>
      isInitial.value ? "overflow-hidden h-[100dvh]" : ""
    ),
  },
  htmlAttrs: {
    class: computed(() =>
      isInitial.value ? "overflow-hidden h-[100dvh]" : ""
    ),
  },
});

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

const handleSend = (text: string) => {
  // Use a delay for the first message to allow the UI transition to complete
  const delay = isInitial.value ? 650 : 0;
  chatStore.addMessage("user", text, delay);
};

const resetChat = () => {
  chatStore.messages = [];
};

const scrollToBottom = async () => {
  await nextTick();
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

const lastMessageText = computed(() => {
  const last = chatStore.messages[chatStore.messages.length - 1];
  return last?.role === "assistant" ? last.text : "";
});

watch(
  () => chatStore.messages.length,
  (newLength) => {
    if (newLength > 0) {
      scrollToBottom();
    }
  }
);
watch(() => chatStore.isTyping, scrollToBottom);
watch(lastMessageText, () => {
  if (chatStore.isTyping) {
    scrollToBottom();
  }
});

onMounted(() => {});

definePageMeta({
  layout: false,
});
</script>

<template>
  <div
    :class="[
      'bg-speakeasy flex flex-col',
      isInitial
        ? 'fixed inset-0 h-[100dvh] overflow-hidden'
        : 'min-h-[100dvh] relative',
    ]"
  >
    <!-- Top Navigation -->
    <ClientOnly>
      <nav
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 800,
            delay: 100,
            type: 'spring',
            stiffness: 100,
            damping: 20,
          },
        }"
        class="w-full py-4 px-6 flex items-center justify-between z-50 transition-all duration-300 sticky top-0"
        :class="
          isInitial
            ? ''
            : 'border-b border-semantic-border/30 bg-semantic-background/80 backdrop-blur-md'
        "
      >
        <div
          class="flex items-center gap-4"
          v-motion
          :initial="{ opacity: 0, x: -10 }"
          :enter="{
            opacity: 1,
            x: 0,
            transition: { delay: 300, duration: 600 },
          }"
        >
          <NuxtLink
            to="/"
            class="text-xs font-body text-semantic-secondaryText/60 hover:text-semantic-highlight transition-all flex items-center gap-2 group"
            title="Voltar ao site"
          >
            <ArrowLeft
              class="w-5 h-5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform"
            />
            <span class="uppercase tracking-widest font-medium"
              >Voltar ao site</span
            >
          </NuxtLink>
        </div>

        <button
          v-if="!isInitial"
          @click="resetChat"
          v-motion
          :initial="{ opacity: 0, x: 10 }"
          :enter="{
            opacity: 1,
            x: 0,
            transition: { delay: 300, duration: 600 },
          }"
          class="text-xs font-body text-semantic-secondaryText/60 hover:text-semantic-highlight transition-colors flex items-center gap-1.5"
          title="Nova Conversa"
        >
          <MessageSquarePlus class="w-5 h-5 md:w-4 md:h-4" />
          <span class="hidden md:inline">Nova Conversa</span>
        </button>
      </nav>
      <template #fallback>
        <nav
          class="w-full py-4 px-6 flex items-center justify-between z-50 transition-all duration-300 sticky top-0"
          :class="
            isInitial
              ? ''
              : 'border-b border-semantic-border/30 bg-semantic-background/80 backdrop-blur-md'
          "
        >
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/"
              class="text-xs font-body text-semantic-secondaryText/60 hover:text-semantic-highlight transition-all flex items-center gap-2 group"
            >
              <ArrowLeft class="w-5 h-5 md:w-4 md:h-4" />
              <span class="uppercase tracking-widest font-medium"
                >Voltar ao site</span
              >
            </NuxtLink>
          </div>
        </nav>
      </template>
    </ClientOnly>

    <main
      :class="[
        'flex-1 flex flex-col max-w-5xl mx-auto w-full px-6 relative',
        isInitial ? 'overflow-hidden' : '',
      ]"
      ref="chatBodyRef"
    >
      <Transition name="fade-slide" mode="out-in">
        <!-- Initial State UI: Centered like GPT/Gemini -->
        <div
          v-if="isInitial"
          key="initial"
          class="flex-1 flex flex-col items-center justify-center py-4 md:py-8 overflow-hidden"
        >
          <ChatHeader class="w-full" />

          <div class="w-full mt-6 md:mt-12 max-w-3xl overflow-hidden">
            <QuickActions
              v-if="!chatStore.isTyping"
              :actions="chatStore.suggestions"
              @select="handleSend"
            />
          </div>
        </div>

        <!-- Chatting State UI -->
        <div v-else key="chatting" class="flex flex-col py-8">
          <TransitionGroup name="message-list">
            <ChatMessage
              v-for="(msg, index) in chatStore.messages"
              :key="msg.id"
              :role="msg.role"
              :text="msg.text"
              :timestamp="formatTime(msg.timestamp)"
              :is-typing="
                chatStore.isTyping &&
                index === chatStore.messages.length - 1 &&
                msg.role === 'assistant'
              "
            />
          </TransitionGroup>
        </div>
      </Transition>
    </main>

    <!-- Bottom Input -->
    <ClientOnly>
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1000,
            delay: 200,
            type: 'spring',
            stiffness: 80,
            damping: 15,
          },
        }"
        :class="[
          'w-full z-40 bg-gradient-to-t from-semantic-background via-semantic-background to-transparent px-6',
          isInitial
            ? 'pb-6 md:pb-10 pt-4'
            : 'pt-12 pb-6 md:pb-10 sticky bottom-0',
        ]"
      >
        <div class="max-w-3xl mx-auto w-full">
          <ChatInput @send="handleSend" :disabled="chatStore.isTyping" />
          <p
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 1200, duration: 1000 } }"
            class="text-[10px] text-center mt-3 text-semantic-secondaryText/30 font-body uppercase tracking-widest"
          >
            Hick pode fornecer sugestões criativas; verifique sempre as
            regulamentações locais.
          </p>
        </div>
      </div>
      <template #fallback>
        <div
          :class="[
            'w-full z-40 bg-gradient-to-t from-semantic-background via-semantic-background to-transparent px-6',
            isInitial
              ? 'pb-6 md:pb-10 pt-4'
              : 'pt-12 pb-6 md:pb-10 sticky bottom-0',
          ]"
        >
          <div class="max-w-3xl mx-auto w-full">
            <ChatInput @send="handleSend" :disabled="chatStore.isTyping" />
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
