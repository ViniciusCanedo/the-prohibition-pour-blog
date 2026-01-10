<script setup lang="ts">
import { motion } from "motion-v"
import { MessageSquareText, Send } from "lucide-vue-next"
</script>

<template>
  <section id="ai-chat" class="py-12 md:py-24 bg-[#0A0A0A] relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-speakeasy-gold/20 to-transparent" />
    
    <div class="container max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          :initial="{ opacity: 0, x: -30 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true }"
        >
          <h2 class="text-4xl md:text-6xl display-font text-speakeasy-white mb-8">
            Crie seu Menu de Bebidas com <span class="text-speakeasy-gold">IA</span>
          </h2>
          <p class="text-lg text-speakeasy-champagne/80 font-body leading-relaxed mb-10">
            Converse com o Hick, nossa inteligência artificial, e crie um cardápio de coquetéis sob medida, perfeitamente alinhado ao conceito do seu bar e ao perfil do seu público.
          </p>
          <NuxtLink to="/ai-chat" class="w-fit px-8 py-4 rounded-full bg-speakeasy-gold text-speakeasy-nearBlack font-bold hover:bg-speakeasy-gold/80 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group">
            <MessageSquareText class="w-5 h-5" />
            Começar a Conversa
          </NuxtLink>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 30 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          class="glass-dark rounded-2xl p-6 border border-speakeasy-gold/10 shadow-2xl relative"
        >
          <div class="flex items-center gap-3 mb-8 pb-4 border-b border-speakeasy-gold/10">
            <div class="w-3 h-3 rounded-full bg-red-500/50" />
            <div class="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div class="w-3 h-3 rounded-full bg-green-500/50" />
            <span class="text-xs text-speakeasy-gold/50 uppercase tracking-widest ml-2">Hick AI</span>
          </div>

          <div class="space-y-6 mb-8">
            <div class="flex gap-4">
              <div class="w-8 h-8 rounded-full bg-speakeasy-gold/20 flex items-center justify-center flex-shrink-0 border border-speakeasy-gold/30">
                <span class="text-[10px] font-bold text-speakeasy-gold">H</span>
              </div>
              <div class="bg-speakeasy-brown/20 p-4 rounded-2xl rounded-tl-none border border-speakeasy-brown/30 max-w-[80%]">
                <p class="text-sm text-speakeasy-champagne/90">Bem-vindo ao The Prohibition Pour. Eu sou o Hick. Me fale sobre o conceito do seu bar. Estamos procurando por inspirações clássicas ou toques modernos?</p>
              </div>
            </div>

            <div class="flex gap-4 justify-end">
              <div class="bg-speakeasy-gold/10 p-4 rounded-2xl rounded-tr-none border border-speakeasy-gold/20 max-w-[80%]">
                <p class="text-sm text-speakeasy-white">Eu quero um menu inspirado nos bares clandestinos dos anos 1920, com foco em gin e whiskey de centeio.</p>
              </div>
            </div>
          </div>

          <div class="relative">
            <input 
              type="text"
              placeholder="Descreva sua visão..." 
              class="w-full bg-speakeasy-nearBlack/50 border border-speakeasy-gold/20 rounded-full px-6 py-4 text-sm text-speakeasy-white focus:outline-none focus:border-speakeasy-gold/50 transition-colors pr-14"
              disabled
            />
          <button class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-speakeasy-gold flex items-center justify-center text-speakeasy-nearBlack hover:bg-speakeasy-amber transition-colors">
            <Send class="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  </section>
</template>
