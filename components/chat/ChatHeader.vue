<script setup lang="ts"></script>

<template>
  <header 
    class="text-center px-6"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        delay: 100
      }
    }"
  >
    <div 
      class="mb-4 inline-flex items-center justify-center"
      v-motion
      :initial="{ scale: 0.8, opacity: 0 }"
      :enter="{ 
        scale: 1, 
        opacity: 1,
        transition: {
          delay: 300,
          duration: 600
        }
      }"
    >
      <ChatAvatar size="lg" class="shadow-[0_0_40px_rgba(198,154,72,0.1)]" />
    </div>
    <h1 
      class="text-4xl md:text-6xl font-display text-semantic-highlight mb-3"
      v-motion
      :initial="{ opacity: 0, y: 15 }"
      :enter="{ 
        opacity: 1, 
        y: 0,
        transition: {
          delay: 400,
          duration: 700
        }
      }"
    >
      Fale com o Hick
    </h1>
    <h2
      class="text-lg md:text-xl font-display text-semantic-secondaryText italic opacity-70"
      v-motion
      :initial="{ opacity: 0, y: 10 }"
      :enter="{ 
        opacity: 1, 
        y: 0,
        transition: {
          delay: 550,
          duration: 700
        }
      }"
    >
      seu bartender digital
    </h2>
  </header>
</template>
