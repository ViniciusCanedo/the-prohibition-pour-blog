<script setup lang="ts">
import { motion } from "motion-v"
import { ArrowRight, Sparkles } from "lucide-vue-next"
</script>

<template>
    <section id="hero" class="relative min-h-screen flex items-center pt-12 md:pt-20 overflow-hidden bg-speakeasy">
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-speakeasy-nearBlack/50 to-speakeasy-nearBlack" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(198,154,72,0.05),transparent_70%)]" />
    </div>

    <div class="container max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center mt-20 md:mt-8">
      <motion.div
        :initial="{ opacity: 0, x: -30 }"
        :while-in-view="{ opacity: 1, x: 0 }"
        :viewport="{ once: true }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
      >
          <h1 class="text-3xl md:text-6xl display-font text-speakeasy-white leading-[1.1] mb-8">
            Coqueteis Elegantes com Receitas <span class="text-speakeasy-gold">Atemporais</span>
          </h1>
          
          <p class="text-lg md:text-xl text-speakeasy-champagne/80 font-body leading-relaxed mb-12 max-w-xl">
            Descubra receitas de coquetéis refinados e ferramentas inteligentes projetadas para bartenders, restaurantes e entusiastas da coquetelaria.
          </p>

          <div class="flex flex-wrap gap-6">
            <NuxtLink to="/recipes" class="px-8 py-4 rounded-full bg-speakeasy-gold text-speakeasy-nearBlack font-bold hover:bg-speakeasy-gold/80 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group">
              Explorar Receitas
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
            <NuxtLink to="/ai-chat" class="px-8 py-4 rounded-full border border-speakeasy-gold text-speakeasy-gold font-bold hover:bg-speakeasy-gold/10 transition-all duration-300 transform hover:scale-105">
              Fale com nossa IA
            </NuxtLink>
          </div>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, scale: 0.9, rotate: 5 }"
          :while-in-view="{ opacity: 1, scale: 1, rotate: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 1, ease: 'easeOut' }"
          class="relative aspect-[4/5] lg:aspect-square"
        >
          <div class="absolute inset-0 rounded-2xl border-2 border-speakeasy-gold/20 -rotate-3 translate-x-4 translate-y-4" />
          <div class="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-speakeasy-gold/10 border border-speakeasy-brown/30">
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
              alt="Coquetel Sofisticado" 
              class="w-full h-full object-cover grayscale-[0.2] sepia-[0.1] hover:scale-110 transition-transform duration-700"
            />
          </div>
        </motion.div>
    </div>
  </section>
</template>
