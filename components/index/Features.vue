<script setup lang="ts">
import { motion } from "motion-v"
import { Martini, Brain, Users } from "lucide-vue-next"

const features = [
  {
    title: "Coqueteis Artesanais Exclusivos",
    description: "Receitas desenvolvidas profissionalmente inspiradas na cultura clássica dos speakeasies.",
    icon: Martini,
  },
  {
    title: "Crie sua Carta de Drinks com o Hick",
    description: "Crie cardápios de bebidas personalizados para bares e restaurantes em minutos.",
    icon: Brain,
  },
  {
    title: "Agende uma Consultoria Humanizada",
    description: "Orientação especializada para conceitos de bar, precificação e design de experiência.",
    icon: Users,
  }
];
</script>

<template>
  <section id="features" class="py-12 md:py-24 bg-speakeasy-nearBlack relative overflow-hidden">
    <div class="container max-w-7xl mx-auto px-6 relative z-10">
      <div class="text-center mb-20">
        <motion.div 
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          class="text-4xl md:text-6xl display-font text-speakeasy-white mb-6"
        >
          Mais do que <span class="text-speakeasy-gold">Receitas</span>
        </motion.div>
        <div class="gold-divider max-w-xs mx-auto" />
      </div>

        <div class="grid md:grid-cols-3 gap-8">
        <motion.div
          v-for="(feature, index) in features"
          :key="index"
          :initial="{ opacity: 0, y: 0 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ 
            delay: index * 0.2,
            y: { type: 'spring', stiffness: 300, damping: 20 }
          }"
          class="glass-dark p-8 rounded-2xl border border-speakeasy-brown/20 group hover:border-speakeasy-gold/40 transition-all duration-500"
        >
          <div class="w-14 h-14 rounded-full bg-speakeasy-gold/10 flex items-center justify-center mb-6 group-hover:bg-speakeasy-gold/20 transition-colors">
            <component :is="feature.icon" class="w-6 h-6 text-speakeasy-gold" />
          </div>
          <h3 class="text-2xl display-font text-speakeasy-white mb-4 group-hover:text-speakeasy-gold transition-colors">
            {{ feature.title }}
          </h3>
          <p class="text-speakeasy-champagne/70 font-body leading-relaxed">
            {{ feature.description }}
          </p>
        </motion.div>
      </div>
    </div>
  </section>
</template>
