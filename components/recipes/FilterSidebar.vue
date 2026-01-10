<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useFilterStore } from '~/stores/filters'
import { motion, AnimatePresence } from "motion-v"

const store = useFilterStore()

const drinkTypes = [
  { label: 'Coquetéis', value: 'cocktail' },
  { label: 'Bitters', value: 'bitters' },
  { label: 'Xaropes', value: 'syrups' },
  { label: 'Autorais', value: 'signature' },
  { label: 'Clássicos', value: 'classic' },
  { label: 'Mocktails', value: 'mocktail' }
]
const cocktailFamilies = [
  { label: 'Sours', value: 'sours' },
  { label: 'Fizzes', value: 'fizzes' },
  { label: 'Tiki', value: 'tiki' },
  { label: 'Punches', value: 'punches' },
  { label: 'Classics', value: 'classics' },
  { label: 'Highballs', value: 'highballs' }
]
const fruitOptions = [
  { label: 'Lime', value: 'lime' },
  { label: 'Lemon', value: 'lemon' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Berries', value: 'berries' },
  { label: 'Apple', value: 'apple' }
]
const countries = [
  { label: 'USA', value: 'usa' },
  { label: 'Brazil', value: 'brazil' },
  { label: 'Italy', value: 'italy' },
  { label: 'France', value: 'france' },
  { label: 'Cuba', value: 'cuba' },
  { label: 'Mexico', value: 'mexico' }
]
const seasons = [
  { label: 'Verão', value: 'summer' },
  { label: 'Outono', value: 'autumn' },
  { label: 'Inverno', value: 'winter' },
  { label: 'Primavera', value: 'spring' }
]
const alcoholicOptions = [
  { label: 'Alcoólico', value: 'alcoholic' },
  { label: 'Não Alcoólico', value: 'non-alcoholic' }
]

const isCountryDropdownOpen = ref(false)
const countryDropdownRef = ref<HTMLElement | null>(null)

const selectCountry = (countryValue: string) => {
  store.setCountry(countryValue)
  isCountryDropdownOpen.value = false
}

const getCountryLabel = (value: string) => {
  return countries.find(c => c.value === value)?.label || 'Todos os países'
}

const handleClickOutside = (event: MouseEvent) => {
  if (countryDropdownRef.value && !countryDropdownRef.value.contains(event.target as Node)) {
    isCountryDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <aside class="w-full space-y-10 h-fit">
      <!-- Drink Type (Checkbox Style) -->
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.1 }"
      >
        <h4 class="display-font text-semantic-highlight text-2xl tracking-widest mb-6">Tipos de Bebida</h4>
        <div class="space-y-3">
          <label v-for="type in drinkTypes" :key="type.value" class="flex items-center group cursor-pointer">
            <div 
              class="w-5 h-5 rounded border border-semantic-border flex items-center justify-center transition-all duration-300 group-hover:border-semantic-highlight/50"
              :class="{ 'bg-semantic-highlight border-semantic-highlight': store.drinkType.includes(type.value) }"
              @click="store.toggleDrinkType(type.value)"
            >
              <svg v-if="store.drinkType.includes(type.value)" class="w-3 h-3 text-semantic-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="ml-3 text-sm text-semantic-secondaryText/70 group-hover:text-semantic-primaryText transition-colors duration-300">
              {{ type.label }}
            </span>
          </label>
        </div>
      </motion.div>

      <!-- Cocktail Family (Checkbox Style) -->
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.2 }"
      >
        <h4 class="display-font text-semantic-highlight text-2xl tracking-widest mb-6">Familias de Coqueteis</h4>
        <div class="space-y-3">
          <label v-for="family in cocktailFamilies" :key="family.value" class="flex items-center group cursor-pointer">
            <div 
              class="w-5 h-5 rounded border border-semantic-border flex items-center justify-center transition-all duration-300 group-hover:border-semantic-highlight/50"
              :class="{ 'bg-semantic-highlight border-semantic-highlight': store.family.includes(family.value) }"
              @click="store.toggleFamily(family.value)"
            >
              <svg v-if="store.family.includes(family.value)" class="w-3 h-3 text-semantic-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="ml-3 text-sm text-semantic-secondaryText/70 group-hover:text-semantic-primaryText transition-colors duration-300">
              {{ family.label }}
            </span>
          </label>
        </div>
      </motion.div>

      <!-- Alcoholic Toggle -->
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.3 }"
      >
        <h4 class="display-font text-semantic-highlight text-2xl tracking-widest mb-6">Teor Alcoolico</h4>
        <div class="flex p-1 bg-semantic-surface rounded-xl border border-semantic-border">
          <button 
            v-for="option in alcoholicOptions" 
            :key="option.value"
            class="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all duration-300"
            :class="store.alcoholic === option.value ? 'bg-semantic-highlight text-semantic-background shadow-lg' : 'text-semantic-secondaryText/50 hover:text-semantic-secondaryText'"
            @click="store.setAlcoholic(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </motion.div>

      <!-- Fruits (Multi-select) -->
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.4 }"
      >
        <h4 class="display-font text-semantic-highlight text-2xl tracking-widest mb-6">Frutas</h4>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="fruit in fruitOptions" 
            :key="fruit.value"
            class="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300"
            :class="store.fruits.includes(fruit.value) 
              ? 'bg-semantic-highlight border-semantic-highlight text-semantic-background' 
              : 'border-semantic-border text-semantic-secondaryText/60 hover:border-semantic-highlight/50 hover:text-semantic-highlight'"
            @click="store.toggleFruit(fruit.value)"
          >
            {{ fruit.label }}
          </button>
        </div>
      </motion.div>

      <!-- Country of Origin (Custom Select) -->
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.5 }"
      >
        <h4 class="display-font text-semantic-highlight text-2xl tracking-widest mb-6">Origem</h4>
        <div class="relative" ref="countryDropdownRef">
          <button 
            type="button"
            @click="isCountryDropdownOpen = !isCountryDropdownOpen"
            class="w-full flex items-center justify-between bg-semantic-surface border border-semantic-border text-semantic-secondaryText/70 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-semantic-highlight transition-all duration-300 hover:border-semantic-highlight/50"
            :class="{ 'border-semantic-highlight': isCountryDropdownOpen }"
          >
            <span>{{ getCountryLabel(store.country) }}</span>
            <svg 
              class="w-4 h-4 text-semantic-highlight transition-transform duration-300"
              :class="{ 'rotate-180': isCountryDropdownOpen }"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

            <AnimatePresence>
              <motion.div 
                v-if="isCountryDropdownOpen"
                :initial="{ opacity: 0, y: -10 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -10 }"
                class="absolute z-50 w-full mt-2 bg-semantic-surface border border-semantic-border rounded-xl shadow-2xl overflow-hidden py-1"
              >
                <button
                  @click="selectCountry('')"
                  class="w-full text-left px-4 py-3 text-sm transition-colors duration-200"
                  :class="store.country === '' ? 'bg-semantic-highlight text-semantic-background font-medium' : 'text-semantic-secondaryText hover:bg-semantic-highlight/10 hover:text-semantic-highlight'"
                >
                  Todos os países
                </button>
                <button
                  v-for="country in countries"
                  :key="country.value"
                  @click="selectCountry(country.value)"
                  class="w-full text-left px-4 py-3 text-sm transition-colors duration-200"
                  :class="store.country === country.value ? 'bg-semantic-highlight text-semantic-background font-medium' : 'text-semantic-secondaryText hover:bg-semantic-highlight/10 hover:text-semantic-highlight'"
                >
                  {{ country.label }}
                </button>
              </motion.div>
            </AnimatePresence>
        </div>
      </motion.div>

      <!-- Season (Pill Selector) -->
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.6 }"
      >
        <h4 class="display-font text-semantic-highlight text-2xl tracking-widest mb-6">Temporada do Ano</h4>
        <div class="grid grid-cols-2 gap-2">
          <button 
            v-for="season in seasons" 
            :key="season.value"
            class="py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all duration-300"
            :class="store.season === season.value 
              ? 'bg-semantic-highlight border-semantic-highlight text-semantic-background' 
              : 'border-semantic-border text-semantic-secondaryText/60 hover:border-semantic-highlight/50 hover:text-semantic-highlight'"
            @click="store.toggleSeason(season.value)"
          >
            {{ season.label }}
          </button>
        </div>
      </motion.div>

  </aside>
</template>
