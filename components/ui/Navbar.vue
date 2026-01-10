<script setup lang="ts">
import { ref } from "vue"
import { motion, AnimatePresence } from "motion-v"
import { Menu, X } from "lucide-vue-next"

const isOpen = ref(false)

const navLinks = [
  { name: 'Início', href: '/#hero' },
  { name: 'Serviços', href: '/#features' },
  { name: 'Sobre', href: '/#about' },
  { name: 'Receitas', href: '/#recipes' },
  { name: 'Hick AI', href: '/#ai-chat' },
  { name: 'Consultoria', href: '/#consulting' },
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6">
    <motion.nav
      :initial="{ y: -20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut' }"
      class="glass-dark rounded-full px-4 md:px-8 py-2 md:py-4 flex items-center justify-between md:justify-center gap-4 md:gap-12 border border-speakeasy-brown/30 shadow-2xl w-full max-w-[95%] md:w-auto z-50"
    >
      <!-- Mobile Menu Button -->
      <button 
        @click="toggleMenu"
        class="md:hidden text-speakeasy-gold p-2 hover:bg-speakeasy-brown/20 rounded-full transition-colors"
        aria-label="Toggle menu"
      >
        <Menu v-if="!isOpen" :size="24" />
        <X v-else :size="24" />
      </button>

      <!-- Desktop Links (Left) -->
      <div class="hidden md:flex items-center gap-12">
        <NuxtLink v-for="link in navLinks.slice(0, 3)" :key="link.name" :to="link.href" class="hover:text-speakeasy-gold transition-colors text-center text-sm uppercase tracking-widest font-medium">
          {{ link.name }}
        </NuxtLink>
      </div>
      
      <!-- Logo -->
      <NuxtLink to="/" class="relative w-12 h-12 md:w-20 md:h-20 flex items-center justify-center">
        <img src="/logo.svg" alt="The Prohibition Pour" width="96" height="96" class="object-contain" />
      </NuxtLink>

      <!-- Desktop Links (Right) -->
      <div class="hidden md:flex items-center gap-12">
        <NuxtLink v-for="link in navLinks.slice(3)" :key="link.name" :to="link.href" class="hover:text-speakeasy-gold transition-colors text-sm uppercase tracking-widest font-medium whitespace-nowrap">
          {{ link.name }}
        </NuxtLink>
      </div>

      <!-- Mobile Spacer to center logo -->
      <div class="md:hidden w-10"></div>
    </motion.nav>

    <!-- Mobile Menu Overlay -->
    <AnimatePresence>
      <motion.div
        v-if="isOpen"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        class="fixed inset-0 md:hidden z-[45] bg-speakeasy-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-8"
      >
        <div class="flex flex-col items-center gap-8">
          <NuxtLink 
            v-for="(link, index) in navLinks" 
            :key="link.name" 
            :to="link.href" 
            @click="isOpen = false"
            class="text-2xl uppercase tracking-[0.4em] font-medium text-speakeasy-gold hover:text-white transition-colors"
          >
            <motion.span
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: index * 0.1, duration: 0.4 }"
              class="block"
            >
              {{ link.name }}
            </motion.span>
          </NuxtLink>
        </div>
      </motion.div>
    </AnimatePresence>
  </nav>
</template>
