export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  compatibilityDate: '2024-11-01',
  // Force Nitro reload
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'motion-v/nuxt', '@pinia/nuxt', '@nuxt/content'],
  vue: {
    compilerOptions: {
      directiveTransforms: {
        motion: () => ({
          props: [],
          needRuntime: true
        })
      }
    }
  },
  content: {
    renderer: {
      anchorLinks: false
    }
  },
  mdc: {
    headings: {
      anchorLinks: false
    }
  },
  experimental: {
    appManifest: false
  },
  vite: {
    resolve: {
      alias: {
        'motion/vue': 'motion-v'
      }
    }
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'The Prohibition Pour | Craft Cocktails & Speakeasy Culture',
      meta: [
        { name: 'description', content: 'Vintage soul, modern technique. Discover refined cocktail recipes and intelligent tools for the modern bartender.' }
      ],
      htmlAttrs: {
        lang: 'pt_BR',
        class: 'dark'
      },
      bodyAttrs: {
        class: 'antialiased selection:bg-speakeasy-gold selection:text-speakeasy-nearBlack'
      },
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon16.png' },
        { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon64.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  }
})
