<script setup lang="ts">
import { motion } from "motion-v"
</script>

<template>
  <section id="about" class="py-12 md:py-24 bg-speakeasy-nearBlack relative">
    <div class="container max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          :initial="{ opacity: 0, x: -30 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.8 }"
        >
          <h2 class="text-4xl md:text-6xl display-font text-speakeasy-white mb-8">
            Sobre o <span class="text-speakeasy-gold">Projeto</span>
          </h2>
          <p class="text-lg text-speakeasy-champagne/80 font-body leading-relaxed mb-8">
            Nascido de uma paixão por coquetéis clássicos e hospitalidade moderna, este blog une tradição e inovação — ajudando bares a contar histórias através de drinks.
          </p>
          <div class="grid grid-cols-2 gap-8 border-t border-speakeasy-gold/20 pt-8 mt-8">
            <div>
              <div class="text-3xl display-font text-speakeasy-gold mb-2">1920s</div>
              <div class="text-sm text-speakeasy-champagne/60 uppercase tracking-widest">Inspiração</div>
            </div>
            <div>
              <div class="text-3xl display-font text-speakeasy-gold mb-2">Moderna</div>
              <div class="text-sm text-speakeasy-champagne/60 uppercase tracking-widest">Técnica</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, scale: 0.95 }"
          :while-in-view="{ opacity: 1, scale: 1 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.8 }"
          class="relative group"
        >
          <div class="absolute inset-0 bg-speakeasy-gold/10 rounded-2xl blur-3xl group-hover:bg-speakeasy-gold/20 transition-all duration-700" />
          <div class="relative rounded-2xl overflow-hidden border border-speakeasy-brown/30 aspect-video">
            <img 
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2157&auto=format&fit=crop" 
              alt="Bartender preparando um drink" 
              class="w-full h-full object-cover grayscale-[0.3] sepia-[0.2] hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>
    </div>
  </section>
</template>
