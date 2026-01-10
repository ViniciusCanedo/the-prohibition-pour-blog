import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) {
    nuxtApp.vueApp.directive('motion', {
      getSSRProps() {
        return {}
      }
    })
  }
})
