<script setup lang="ts">
import { computed } from 'vue'
import { Clock, Star } from "lucide-vue-next"

interface Props {
  slug?: string
  image: string
  title: string
  description: string
  tags: string[]
  isAlcoholic: boolean
  prepTime: string
  rating: number
}

const props = defineProps<Props>()

const recipeLink = computed(() => props.slug ? `/recipes/${props.slug}` : '#')
</script>

<template>
  <div
    class="group relative bg-semantic-card/40 backdrop-blur-md rounded-2xl overflow-hidden border border-semantic-border hover:border-semantic-highlight/50 transition-all duration-300 shadow-xl h-full"
  >
    <!-- Card Content -->
    <div class="flex flex-col h-full">
      <!-- Image Container -->
      <div class="relative h-64 overflow-hidden">
        <img
          :src="image"
          :alt="title"
          class="w-full h-full object-cover grayscale-[0.2] sepia-[0.1] group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-110 transition-all duration-500"
        />
        <!-- Alcohol Indicator -->
        <div 
          class="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border"
          :class="isAlcoholic ? 'bg-semantic-accent/50 text-semantic-accent border-semantic-accent/30' : 'bg-green-500/20 text-green-400 border-green-500/30'"
        >
          {{ isAlcoholic ? 'Com álcool' : 'Sem álcool' }}
        </div>
      </div>

      <!-- Text Content -->
      <div class="p-6 flex flex-col flex-grow">
        <div class="flex-grow">
          <!-- Metadata -->
          <div class="flex items-center gap-4 text-xs text-semantic-secondaryText/50 uppercase tracking-widest mb-4">
            <span class="flex items-center gap-1.5">
              <Clock class="w-3.5 h-3.5" />
              {{ prepTime }}
            </span>
            <span class="flex items-center gap-1.5">
              <Star class="w-3.5 h-3.5 text-semantic-highlight fill-semantic-highlight" />
              {{ rating.toFixed(1) }}
            </span>
          </div>

          <h3 class="display-font text-2xl md:text-3xl text-semantic-primaryText mb-3 group-hover:text-semantic-highlight transition-colors duration-300">
            {{ title }}
          </h3>
          
          <p class="text-semantic-secondaryText/70 text-sm font-body line-clamp-3 mb-6 leading-relaxed">
            {{ description }}
          </p>
        </div>

        <div class="mt-auto space-y-6">
          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in tags" 
              :key="tag"
              class="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded border border-semantic-highlight/20 text-semantic-highlight/70"
            >
              {{ tag }}
            </span>
          </div>

          <!-- CTA -->
            <NuxtLink :to="recipeLink" class="w-full py-4 px-6 rounded-xl border border-semantic-highlight/20 bg-semantic-highlight/5 text-semantic-highlight text-xs font-bold uppercase tracking-widest hover:bg-semantic-highlight hover:text-semantic-background transition-all duration-300 block text-center">
              Ver Receita
            </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Gold Glow Overlay -->
    <div class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div class="absolute inset-0 shadow-[0_0_30px_rgba(198,154,72,0.15)]" />
    </div>
  </div>
</template>
