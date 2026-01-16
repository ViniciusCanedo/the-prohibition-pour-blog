<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { motion, AnimatePresence } from "motion-v"
import { Clock, Star, MapPin, Leaf, Wine, ArrowLeft } from "lucide-vue-next"
import { useRecipes } from '~/composables/useRecipes'

const route = useRoute()
const router = useRouter()
const { getRecipeBySlug, getRelatedRecipes } = useRecipes()

const slug = computed(() => route.params.slug as string)
const recipe = computed(() => getRecipeBySlug(slug.value))
const relatedRecipes = computed(() => getRelatedRecipes(slug.value, 3))

const userRating = ref(0)
const hoveredRating = ref(0)
const isRated = ref(false)
const isSubmitting = ref(false)

const handleRate = (rating: number) => {
  if (isRated.value) return
  userRating.value = rating
}

const submitReview = async () => {
  if (userRating.value === 0) return
  isSubmitting.value = true
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
  isRated.value = true
}

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/recipes')
  }
}

const seasonDisplay = computed(() => {
  if (!recipe.value) return ''
  const season = recipe.value.season
  return Array.isArray(season) ? season.join(', ') : season
})

useHead({
  title: computed(() => recipe.value ? `${recipe.value.title} | The Prohibition Pour` : 'Recipe Not Found')
})
</script>

<template>
  <div class="min-h-screen bg-speakeasy bg-semantic-background">
    <UiNavbar />
    
    <div v-if="recipe" class="pt-24 pb-16">
      <motion.div
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.5 }"
      >
        <div class="max-w-6xl mx-auto px-6 mt-4 md:mt-24">
          <button 
            @click="goBack" 
            class="inline-flex items-center gap-2 text-semantic-secondaryText/60 hover:text-semantic-highlight transition-colors duration-300 mb-8 group"
          >
            <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span class="text-sm uppercase tracking-widest">Voltar às Receitas</span>
          </button>

          <section class="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            <motion.div
              :initial="{ opacity: 0, x: -30 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ duration: 0.6, delay: 0.1 }"
              class="relative"
            >
              <div class="aspect-[4/5] rounded-2xl overflow-hidden border border-semantic-border shadow-2xl">
                <img 
                  :src="recipe.image" 
                  :alt="recipe.title"
                  class="w-full h-full object-cover"
                />
              </div>
              <div 
                class="absolute top-6 left-6 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md border"
                :class="recipe.isAlcoholic 
                  ? 'bg-semantic-accent/50 text-semantic-primaryText border-semantic-accent/30' 
                  : 'bg-green-500/20 text-green-400 border-green-500/30'"
              >
                <span class="flex items-center gap-2">
                  <Wine class="w-3.5 h-3.5" />
                  {{ recipe.isAlcoholic ? 'Com álcool' : 'Sem álcool' }}
                </span>
              </div>
            </motion.div>

            <motion.div
              :initial="{ opacity: 0, x: 30 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ duration: 0.6, delay: 0.2 }"
              class="flex flex-col justify-center"
            >
              <div class="flex flex-wrap gap-2 mb-6">
                <span 
                  v-for="tag in recipe.tags" 
                  :key="tag"
                  class="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-semantic-highlight/30 text-semantic-highlight"
                >
                  {{ tag }}
                </span>
              </div>

              <h1 class="display-font text-5xl md:text-6xl lg:text-7xl text-semantic-primaryText mb-6 leading-tight">
                {{ recipe.title }}
              </h1>

              <p class="text-lg text-semantic-secondaryText/70 font-body leading-relaxed mb-8">
                {{ recipe.description }}
              </p>

              <div class="flex flex-wrap items-center gap-6 text-sm text-semantic-secondaryText/60">
                <span class="flex items-center gap-2">
                  <Clock class="w-4 h-4 text-semantic-highlight" />
                  {{ recipe.prepTime }}
                </span>
                <span class="flex items-center gap-2">
                  <Star class="w-4 h-4 text-semantic-highlight fill-semantic-highlight" />
                  {{ recipe.rating.toFixed(1) }}
                </span>
                <span class="flex items-center gap-2">
                  <MapPin class="w-4 h-4 text-semantic-highlight" />
                  {{ recipe.country }}
                </span>
                <span class="flex items-center gap-2">
                  <Leaf class="w-4 h-4 text-semantic-highlight" />
                  {{ seasonDisplay }}
                </span>
              </div>
            </motion.div>
          </section>

          <div class="gold-divider mb-16" />

          <motion.section
            v-if="recipe.story"
            :initial="{ opacity: 0, y: 30 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.5 }"
            class="mb-20"
          >
            <h2 class="display-font text-4xl text-semantic-primaryText tracking-wider mb-8">A Origem</h2>
            <p class="text-xl md:text-2xl text-semantic-secondaryText/80 font-body leading-relaxed italic first-letter:text-5xl first-letter:font-display first-letter:text-semantic-highlight first-letter:mr-3 first-letter:float-left">
              {{ recipe.story }}
            </p>
          </motion.section>

          <section class="grid lg:grid-cols-3 lg:items-center gap-12 mb-20">
            <motion.div
              :initial="{ opacity: 0, y: 30 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :viewport="{ once: true }"
              :transition="{ duration: 0.5 }"
              class="lg:col-span-1"
            >
              <div class="bg-semantic-surface/50 backdrop-blur-md rounded-2xl border border-semantic-border p-8">
                <h2 class="display-font text-3xl text-semantic-highlight mb-8 tracking-wider">Ingredientes</h2>
                <ul class="space-y-4">
                  <li 
                    v-for="(ingredient, index) in recipe.ingredients" 
                    :key="index"
                    class="flex items-start gap-3 text-semantic-secondaryText/80 font-body"
                  >
                    <span class="w-2 h-2 rounded-full bg-semantic-highlight/50 mt-2 flex-shrink-0" />
                    <span>{{ ingredient }}</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              :initial="{ opacity: 0, y: 30 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :viewport="{ once: true }"
              :transition="{ duration: 0.5, delay: 0.1 }"
              class="lg:col-span-2"
            >
              <h2 class="display-font text-3xl text-semantic-highlight mb-8 tracking-wider">Modo de Preparo</h2>
              <ol class="space-y-6">
                <li 
                  v-for="(step, index) in recipe.steps" 
                  :key="index"
                  class="flex gap-6"
                >
                  <span class="display-font text-4xl text-semantic-highlight/30 leading-none">
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                  <p class="text-semantic-secondaryText/80 font-body leading-relaxed pt-1">
                    {{ step }}
                  </p>
                </li>
              </ol>
            </motion.div>
          </section>

          <motion.section
            v-if="recipe.notes"
            :initial="{ opacity: 0, y: 30 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.5 }"
            class="mb-20"
          >
            <div class="bg-semantic-highlight/5 border border-semantic-highlight/20 rounded-2xl p-8 md:p-10">
              <h2 class="display-font text-3xl text-semantic-highlight mb-6 tracking-wider">Notas do Bartender</h2>
              <p class="text-semantic-secondaryText/80 font-body leading-relaxed text-lg italic">
                "{{ recipe.notes }}"
              </p>
            </div>
          </motion.section>

          <motion.section
            v-if="recipe.pairings && recipe.pairings.length > 0"
            :initial="{ opacity: 0, y: 30 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.5 }"
            class="mb-20"
          >
            <div class="bg-semantic-surface/50 backdrop-blur-md rounded-2xl border border-semantic-border p-8">
              <h2 class="display-font text-3xl text-semantic-highlight mb-8 tracking-wider">Acompanhamentos Perfeitos</h2>
              <div class="flex flex-wrap gap-3">
                <span 
                  v-for="pairing in recipe.pairings" 
                  :key="pairing"
                  class="px-5 py-2.5 rounded-full bg-semantic-card/50 border border-semantic-border text-semantic-secondaryText/80 font-body text-sm"
                >
                  {{ pairing }}
                </span>
              </div>
            </div>
          </motion.section>

          <motion.section
            :initial="{ opacity: 0, y: 30 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.5 }"
            class="mb-20"
          >
            <div class="max-w-xl mx-auto text-center border border-semantic-highlight/20 bg-semantic-surface/30 backdrop-blur-md rounded-2xl p-10">
              <h2 class="display-font text-3xl text-semantic-primaryText mb-4 tracking-wider">O que achou desta receita?</h2>
              <p class="text-semantic-secondaryText/60 mb-8 font-body">Sua avaliação ajuda outros entusiastas a descobrirem as melhores misturas.</p>
              
                <div class="flex flex-col items-center gap-6">
                  <div class="flex gap-2">
                    <button
                      v-for="star in 5"
                      :key="star"
                      @mouseenter="hoveredRating = star"
                      @mouseleave="hoveredRating = 0"
                      @click="handleRate(star)"
                      class="p-1 transition-transform duration-200 hover:scale-110 active:scale-95 disabled:hover:scale-100"
                      :disabled="isRated || isSubmitting"
                    >
                      <Star 
                        class="w-10 h-10 transition-colors duration-300"
                        :class="[
                          (hoveredRating || userRating) >= star 
                            ? 'text-semantic-highlight fill-semantic-highlight' 
                            : 'text-semantic-border fill-transparent'
                        ]"
                      />
                    </button>
                  </div>
                  
                    <div class="flex flex-col items-center justify-center w-full min-h-[80px]">
                      <AnimatePresence mode="wait">
                        <motion.button 
                          v-if="userRating > 0 && !isRated"
                          key="submit-button"
                          :initial="{ opacity: 0, scale: 0.95 }"
                          :animate="{ opacity: 1, scale: 1 }"
                          :exit="{ opacity: 0, scale: 0.95 }"
                          :transition="{ duration: 0.4, ease: 'easeOut' }"
                          @click="submitReview"
                          class="px-10 py-4 bg-semantic-highlight text-semantic-background font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-semantic-highlight/20 flex items-center gap-3"
                          :disabled="isSubmitting"
                        >
                          <span v-if="isSubmitting" class="w-5 h-5 border-2 border-semantic-background/30 border-t-semantic-background rounded-full animate-spin"></span>
                          {{ isSubmitting ? 'Enviando...' : 'Enviar Avaliação' }}
                        </motion.button>
  
                        <motion.p 
                          v-else-if="isRated" 
                          key="thank-you-msg"
                          :initial="{ opacity: 0, y: 10 }"
                          :animate="{ opacity: 1, y: 0 }"
                          :exit="{ opacity: 0, y: -10 }"
                          :transition="{ duration: 0.5, ease: 'easeOut' }"
                          class="text-semantic-highlight font-display text-xl tracking-widest"
                        >
                          Obrigado pelo feedback!
                        </motion.p>
                      </AnimatePresence>
                    </div>
                </div>
            </div>
          </motion.section>

          <div class="gold-divider mb-16" />

          <motion.section
            v-if="relatedRecipes.length > 0"
            :initial="{ opacity: 0, y: 30 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.5 }"
          >
            <h2 class="display-font text-4xl text-semantic-primaryText mb-10 text-center tracking-wider">
              Explore Outras Receitas
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <NuxtLink 
                v-for="related in relatedRecipes" 
                :key="related.id"
                :to="`/recipes/${related.slug}`"
                class="group"
              >
                <motion.div
                  :transition="{ duration: 0.3 }"
                  class="bg-semantic-card/40 backdrop-blur-md rounded-2xl overflow-hidden border border-semantic-border hover:border-semantic-highlight/50 transition-all duration-300"
                >
                  <div class="aspect-[16/10] overflow-hidden">
                    <img 
                      :src="related.image" 
                      :alt="related.title"
                      class="w-full h-full object-cover grayscale-[0.2] sepia-[0.1] group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-110 transition-all duration-500"
                    />
                  </div>
                  <div class="p-6">
                    <div class="flex items-center gap-3 text-xs text-semantic-secondaryText/50 uppercase tracking-widest mb-3">
                      <span class="flex items-center gap-1.5">
                        <Clock class="w-3 h-3" />
                        {{ related.prepTime }}
                      </span>
                      <span class="flex items-center gap-1.5">
                        <Star class="w-3 h-3 text-semantic-highlight fill-semantic-highlight" />
                        {{ related.rating.toFixed(1) }}
                      </span>
                    </div>
                    <h3 class="display-font text-2xl text-semantic-primaryText group-hover:text-semantic-highlight transition-colors duration-300">
                      {{ related.title }}
                    </h3>
                  </div>
                </motion.div>
              </NuxtLink>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>

    <div v-else class="pt-32 pb-16">
      <div class="max-w-6xl mx-auto px-6 md:mt-24 text-center">
        <h1 class="display-font text-5xl text-semantic-primaryText mb-6">Ops!</h1>
        <p class="text-semantic-secondaryText/60 mb-8">A receita que você procura não existe ou foi removida.</p>
          <button 
            @click="goBack" 
            class="inline-flex items-center gap-2 px-8 py-4 bg-semantic-highlight text-semantic-background font-bold uppercase tracking-widest rounded-full hover:bg-semantic-accent transition-all duration-300 transform hover:scale-105 active:scale-95 mx-auto"
          >
          <ArrowLeft class="w-4 h-4" />
          Voltar às Receitas
        </button>
      </div>
    </div>

    <UiFooter />
  </div>
</template>
