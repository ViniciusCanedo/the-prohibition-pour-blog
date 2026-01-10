<script setup lang="ts">
import { ref, computed, watch, onUnmounted, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFilterStore } from '~/stores/filters'
import { motion, AnimatePresence } from "motion-v"

const store = useFilterStore()
const route = useRoute()
const router = useRouter()
const isFiltersOpen = ref(false)
const searchQuery = ref('')

// Function to update URL with current filters
const updateUrl = () => {
  const query: Record<string, string | undefined> = {
    q: searchQuery.value || undefined,
    type: activeFilters.value.drinkType.length > 0 ? activeFilters.value.drinkType.join(',') : undefined,
    alcohol: activeFilters.value.alcoholic || undefined,
    fruits: activeFilters.value.fruits.length > 0 ? activeFilters.value.fruits.join(',') : undefined,
    family: activeFilters.value.family.length > 0 ? activeFilters.value.family.join(',') : undefined,
    country: activeFilters.value.country || undefined,
    season: activeFilters.value.season || undefined
  }
  
  // Clean undefined values
  const cleanQuery = Object.fromEntries(
    Object.entries(query).filter(([_, v]) => v !== undefined)
  )
  
  // Only push if the query has actually changed to avoid redundant history entries
  if (JSON.stringify(route.query) !== JSON.stringify(cleanQuery)) {
    router.push({ query: cleanQuery })
  }
}

// Function to sync URL parameters back to the store and local state
const syncUrlToStore = () => {
  const { q, type, alcohol, fruits, family, country, season } = route.query
  
  if (q !== undefined) {
    searchQuery.value = q as string
  }
  
  const filters = {
    drinkType: type ? (type as string).split(',') : [],
    alcoholic: (alcohol as string) || '',
    fruits: fruits ? (fruits as string).split(',') : [],
    family: family ? (family as string).split(',') : [],
    country: (country as string) || '',
    season: (season as string) || ''
  }
  
  store.setFilters(filters)
  
  activeFilters.value = {
    drinkType: [...store.drinkType],
    alcoholic: store.alcoholic,
    fruits: [...store.fruits],
    family: [...store.family],
    country: store.country,
    season: store.season
  }
}

const recipes = ref([
    {
      id: 1,
      slug: "smoked-old-fashioned",
      title: "Smoked Old Fashioned",
      description: "A classic reinvented with hickory wood smoke and premium bourbon for a deep, mysterious profile.",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
      tags: ["Classic", "Winter", "USA"],
      isAlcoholic: true,
      type: "Classic",
      family: "Classics",
      fruits: ["Orange"],
      country: "USA",
      season: "Winter",
      prepTime: "8 min",
      rating: 5.0
    },
    {
      id: 2,
      slug: "emerald-gin-fizz",
      title: "Emerald Gin Fizz",
      description: "Refreshing botanical gin paired with fresh lime and a touch of basil for a vibrant, garden-to-glass experience.",
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1965&auto=format&fit=crop",
      tags: ["Signature", "Spring", "France"],
      isAlcoholic: true,
      type: "Signature",
      family: "Fizzes",
      fruits: ["Lime"],
      country: "France",
      season: "Spring",
      prepTime: "6 min",
      rating: 4.8
    },
    {
      id: 3,
      slug: "midnight-mule",
      title: "The Midnight Mule",
      description: "A dark twist on the mule featuring black vodka, spicy ginger beer, and a hint of muddled blackberries.",
      image: "https://images.unsplash.com/photo-1597290282695-edc43d0e7129?q=80&w=2075&auto=format&fit=crop",
      tags: ["Cocktail", "Autumn", "Mexico"],
      isAlcoholic: true,
      type: "Cocktail",
      family: "Highballs",
      fruits: ["Berries", "Lime"],
      country: "Mexico",
      season: "Autumn",
      prepTime: "5 min",
      rating: 4.9
    },
    {
      id: 4,
      slug: "virgin-pineapple-mojito",
      title: "Virgin Pineapple Mojito",
      description: "A non-alcoholic delight with fresh mint, lime, and tropical pineapple, topped with crisp soda water.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1974&auto=format&fit=crop",
      tags: ["Mocktail", "Summer", "Cuba"],
      isAlcoholic: false,
      type: "Mocktail",
      family: "Tiki",
      fruits: ["Pineapple", "Lime"],
      country: "Cuba",
      season: "Summer",
      prepTime: "7 min",
      rating: 4.7
    },
    {
      id: 5,
      slug: "spiced-apple-martini",
      title: "Spiced Apple Martini",
      description: "Crisp apple brandy balanced with cinnamon-infused simple syrup and fresh lemon juice.",
      image: "https://anothercocktailblog.com/wp-content/uploads/2021/11/Caramel-Apple-Martini-2.jpg",
      tags: ["Cocktail", "Autumn", "USA"],
      isAlcoholic: true,
      type: "Cocktail",
      family: "Sours",
      fruits: ["Apple", "Lemon"],
      country: "USA",
      season: "Autumn",
      prepTime: "6 min",
      rating: 4.6
    },
    {
      id: 6,
      slug: "negroni-classico",
      title: "Negroni Classico",
      description: "The timeless balance of gin, vermouth rosso, and campari, garnished with a fresh orange peel.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2157&auto=format&fit=crop",
      tags: ["Classic", "Summer", "Italy"],
      isAlcoholic: true,
      type: "Classic",
      family: "Classics",
      fruits: ["Orange"],
      country: "Italy",
      season: "Summer",
      prepTime: "5 min",
      rating: 4.9
    }
  ])
  
  // Initialize activeFilters with store values
    const activeFilters = ref({
      drinkType: [...store.drinkType],
      alcoholic: store.alcoholic,
      fruits: [...store.fruits],
      family: [...store.family],
      country: store.country,
      season: store.season
    })

    const activeFiltersCount = computed(() => {
      let count = 0
      count += activeFilters.value.drinkType.length
      if (activeFilters.value.alcoholic) count += 1
      count += activeFilters.value.fruits.length
      count += activeFilters.value.family.length
      if (activeFilters.value.country) count += 1
      if (activeFilters.value.season) count += 1
      return count
    })
    
      const filteredRecipes = computed(() => {
      return recipes.value.filter(recipe => {
        const matchesSearch = !searchQuery.value || recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesType = activeFilters.value.drinkType.length === 0 || activeFilters.value.drinkType.includes(recipe.type.toLowerCase())
        const matchesAlcohol = !activeFilters.value.alcoholic || (activeFilters.value.alcoholic === 'alcoholic' ? recipe.isAlcoholic : !recipe.isAlcoholic)
        const matchesFruits = activeFilters.value.fruits.length === 0 || activeFilters.value.fruits.some(f => recipe.fruits.map(rf => rf.toLowerCase()).includes(f.toLowerCase()))
        const matchesFamily = activeFilters.value.family.length === 0 || activeFilters.value.family.includes(recipe.family.toLowerCase())
        const matchesCountry = !activeFilters.value.country || recipe.country.toLowerCase() === activeFilters.value.country.toLowerCase()
        const matchesSeason = !activeFilters.value.season || recipe.season.toLowerCase() === activeFilters.value.season.toLowerCase()
        
        return matchesSearch && matchesType && matchesAlcohol && matchesFruits && matchesFamily && matchesCountry && matchesSeason
      })
    })

  const resetFilters = () => {
    store.resetFilters()
    applyFilters()
  }

  // Handle initialization and back/forward navigation
  onMounted(() => {
    syncUrlToStore()
  })

  // Watch for route changes to sync back to filters (handles back button)
  watch(() => route.query, () => {
    syncUrlToStore()
  }, { deep: true })

  // Watch search query to update URL with debounce
  let searchTimeout: any
  watch(searchQuery, () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      updateUrl()
    }, 300)
  })

  const applyFilters = () => {
    activeFilters.value = {
      drinkType: [...store.drinkType],
      alcoholic: store.alcoholic,
      fruits: [...store.fruits],
      family: [...store.family],
      country: store.country,
      season: store.season
    }
    isFiltersOpen.value = false
    updateUrl()
  }


watch(isFiltersOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="min-h-screen bg-speakeasy bg-semantic-background pt-32 flex flex-col">
    <UiNavbar />
    <!-- Content Wrapper -->
    <div class="flex-grow md:mt-16" >
        <!-- Page Header -->
      <header class="container mx-auto px-6 mb-16">
        <div class="text-center">
          <h1 class="text-5xl md:text-7xl display-font text-semantic-primaryText mb-6 leading-tight">
            Drinks e Receitas
          </h1>
          <p class="text-lg text-semantic-secondaryText/60 font-body max-w-2xl mx-auto">
            Explore nossa coleção exclusiva de bebidas artesanais e outras receitas. Filtre por estilo, estação ou origem para encontrar a bebida perfeita.
          </p>
        </div>
      </header>

            <main class="container max-w-7xl mx-auto px-6">
              <!-- Search and Filter Bar -->
              <div class="mb-12 flex flex-col md:flex-row gap-6 items-stretch md:items-center">
                <div class="relative flex-grow w-full md:w-auto group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-semantic-secondaryText/40 group-focus-within:text-semantic-highlight transition-colors duration-300">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input 
                    v-model="searchQuery"
                    type="text" 
                    placeholder="Busque suas receitas aqui..."
                    class="w-full h-[58px] bg-semantic-surface border border-semantic-border rounded-xl pl-12 pr-4 text-semantic-primaryText placeholder:text-semantic-secondaryText/30 focus:outline-none focus:border-semantic-highlight/50 transition-all duration-300 shadow-lg"
                  />
                </div>

                  <button 
                    @click="isFiltersOpen = true"
                    class="relative flex items-center gap-3 px-8 h-[58px] bg-semantic-surface border border-semantic-border rounded-xl text-semantic-highlight text-sm font-bold uppercase tracking-widest hover:border-semantic-highlight/50 transition-all duration-300 group shadow-lg w-full md:w-auto justify-center"
                  >
                    <div v-if="activeFiltersCount > 0" class="absolute -top-2 -right-2 w-6 h-6 bg-semantic-highlight text-semantic-background text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-semantic-background">
                      {{ activeFiltersCount }}
                    </div>
                  <svg class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filtros
                </button>
              </div>

              <!-- Recipe Grid -->
              <div class="w-full">
                <div v-if="filteredRecipes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  <div 
                    v-for="recipe in filteredRecipes" 
                    :key="recipe.id"
                    class="h-full"
                  >
                    <RecipesCard v-bind="recipe" class="h-full" />
                  </div>
                </div>
              
              <!-- Empty State -->
              <div 
                v-if="filteredRecipes.length === 0" 
                class="flex flex-col items-center justify-center py-32 border border-dashed border-semantic-border rounded-3xl"
              >
                <div class="display-font text-2xl text-semantic-secondaryText/40 mb-4">Nenhuma receita encontrada.</div>
                <p class="text-semantic-secondaryText/30 text-sm">Tente ajustar os filtros para encontrar mais resultados.</p>
              </div>
            </div>
        </main>

        <!-- Filter Drawer Overlay -->
        <AnimatePresence>
          <!-- Backdrop -->
          <motion.div 
            v-if="isFiltersOpen"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
            class="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            @click="isFiltersOpen = false"
          />
          
          <!-- Drawer -->
          <motion.div 
            v-if="isFiltersOpen"
            :initial="{ x: '-100%' }"
            :animate="{ x: 0 }"
            :exit="{ x: '-100%' }"
            :transition="{ type: 'spring', damping: 25, stiffness: 200 }"
            class="fixed inset-y-0 left-0 w-[85%] max-w-md bg-semantic-background border-r border-semantic-border p-8 md:p-12 overflow-y-auto custom-scrollbar z-[101]"
          >
            <div class="flex items-center justify-between mb-12">
              <div>
                <h2 class="display-font text-3xl text-semantic-primaryText mb-2">Filtros</h2>
                <div class="h-1 w-12 bg-semantic-highlight rounded-full"></div>
              </div>
              <div class="flex items-center gap-4">
                <button 
                  @click="resetFilters"
                  class="text-xs font-bold uppercase tracking-widest text-semantic-secondaryText/40 hover:text-semantic-highlight transition-colors duration-300"
                >
                  Limpar Filtros
                </button>
                <button 
                  @click="isFiltersOpen = false" 
                  class="w-10 h-10 flex items-center justify-center rounded-full border border-semantic-border text-semantic-secondaryText/50 hover:text-semantic-highlight hover:border-semantic-highlight transition-all duration-300"
                >
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <RecipesFilterSidebar />
            
            <div class="sticky bottom-0 left-0 right-0 pt-10 pb-2 bg-gradient-to-t from-semantic-background via-semantic-background to-transparent mt-12">
              <button 
                @click="applyFilters"
                class="w-full py-5 bg-semantic-highlight text-semantic-background font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors duration-300 shadow-xl"
              >
                Aplicar Filtros
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
    </div>
    <div class="mt-24">
      <UiFooter />
    </div>
  </div>
</template>
