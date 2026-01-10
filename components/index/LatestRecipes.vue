<script setup lang="ts">
import { motion } from "motion-v"
import { Clock, Star, ArrowRight } from "lucide-vue-next"
import { useRecipes } from '~/composables/useRecipes'

const { getAllRecipes } = useRecipes()

// Get the first 3 recipes to display as "Latest"
const latestRecipes = computed(() => getAllRecipes().slice(0, 3))
</script>

<template>
  <section id="recipes" class="py-12 md:py-24 bg-speakeasy-nearBlack relative">
    <div class="container max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <motion.div
              :initial="{ opacity: 0, y: 20 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :viewport="{ once: true }"
            >
              <h2 class="text-4xl md:text-6xl display-font text-speakeasy-white mb-4">
                Últimas <span class="text-speakeasy-gold">Receitas</span>
              </h2>
              <div class="gold-divider w-32" />
            </motion.div>
          </div>

          <div class="grid md:grid-cols-3 gap-8 mb-16">
            <NuxtLink
              v-for="(recipe, index) in latestRecipes"
              :key="recipe.id"
              :to="`/recipes/${recipe.slug}`"
              class="group"
            >
              <motion.div
                :initial="{ opacity: 0, y: 30 }"
                :while-in-view="{ opacity: 1, y: 0 }"
                :viewport="{ once: true }"
                :transition="{ delay: index * 0.1 }"
                class="glass-dark rounded-2xl overflow-hidden border border-speakeasy-brown/20 group cursor-pointer h-full"
              >
                <div class="relative aspect-[4/3] overflow-hidden">
                  <img 
                    :src="recipe.image" 
                    :alt="recipe.title" 
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div class="absolute top-4 right-4 bg-speakeasy-nearBlack/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-speakeasy-gold/20">
                    <Star class="w-3 h-3 text-speakeasy-gold fill-speakeasy-gold" />
                    <span class="text-xs font-bold text-speakeasy-white">{{ recipe.rating.toFixed(1) }}</span>
                  </div>
                </div>
                <div class="p-6">
                  <div class="flex items-center gap-4 text-xs text-speakeasy-champagne/50 uppercase tracking-widest mb-3">
                    <span class="flex items-center gap-1">
                      <Clock class="w-3 h-3" />
                      {{ recipe.prepTime }}
                    </span>
                    <span>•</span>
                    <span>Coquetel Artesanal</span>
                  </div>
                  <h3 class="text-xl display-font text-speakeasy-white group-hover:text-speakeasy-gold transition-colors">
                    {{ recipe.title }}
                  </h3>
                </div>
              </motion.div>
            </NuxtLink>
          </div>

          <motion.div
            :initial="{ opacity: 0, y: 20 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true }"
            class="flex justify-center mt-8 md:mt-0"
          >
            <NuxtLink to="/recipes" class="px-10 py-4 rounded-full border border-speakeasy-gold text-speakeasy-gold font-bold hover:bg-speakeasy-gold/10 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group uppercase tracking-widest text-sm">
              Ver Todas as Receitas
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
          </motion.div>
      </div>
    </section>
  </template>
