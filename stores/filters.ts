import { defineStore } from 'pinia'

export interface FilterState {
  drinkType: string[]
  alcoholic: string
  fruits: string[]
  family: string[]
  country: string
  season: string
}

export const useFilterStore = defineStore('filters', {
  state: (): FilterState => ({
    drinkType: [],
    alcoholic: '',
    fruits: [],
    family: [],
    country: '',
    season: ''
  }),
  actions: {
    setFilters(filters: Partial<FilterState>) {
      Object.assign(this.$state, filters)
    },
    resetFilters() {
      this.drinkType = []
      this.alcoholic = ''
      this.fruits = []
      this.family = []
      this.country = ''
      this.season = ''
    },
    toggleDrinkType(type: string) {
      const index = this.drinkType.indexOf(type)
      if (index > -1) {
        this.drinkType.splice(index, 1)
      } else {
        this.drinkType.push(type)
      }
    },
    toggleFamily(family: string) {
      const index = this.family.indexOf(family)
      if (index > -1) {
        this.family.splice(index, 1)
      } else {
        this.family.push(family)
      }
    },
    toggleFruit(fruit: string) {
      const index = this.fruits.indexOf(fruit)
      if (index > -1) {
        this.fruits.splice(index, 1)
      } else {
        this.fruits.push(fruit)
      }
    },
      setAlcoholic(option: string) {
        this.alcoholic = this.alcoholic === option ? '' : option
      },
    setCountry(country: string) {
      this.country = country
    },
    toggleSeason(season: string) {
      this.season = this.season === season ? '' : season
    }
  }
})
