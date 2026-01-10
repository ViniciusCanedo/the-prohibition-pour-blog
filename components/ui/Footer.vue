<script setup lang="ts">
// No extra logic needed for footer
</script>

<template>
  <footer class="py-12 bg-speakeasy-nearBlack border-t border-speakeasy-brown/20">
    <div class="container max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <NuxtLink to="/" class="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
          <img src="/logo.svg" alt="The Prohibition Pour" width="192" height="192" class="object-contain opacity-80" />
        </NuxtLink>

          <div class="flex flex-wrap justify-center gap-4 md:gap-8">
            <NuxtLink to="/" class="text-[10px] md:text-sm text-speakeasy-champagne/60 hover:text-speakeasy-gold transition-colors uppercase tracking-widest font-bold">Início</NuxtLink>
            <NuxtLink to="/recipes" class="text-[10px] md:text-sm text-speakeasy-champagne/60 hover:text-speakeasy-gold transition-colors uppercase tracking-widest font-bold">Receitas</NuxtLink>
            <NuxtLink to="/ai-chat" class="text-[10px] md:text-sm text-speakeasy-champagne/60 hover:text-speakeasy-gold transition-colors uppercase tracking-widest font-bold">Hick AI</NuxtLink>
            <NuxtLink to="/#consulting" class="text-[10px] md:text-sm text-speakeasy-champagne/60 hover:text-speakeasy-gold transition-colors uppercase tracking-widest font-bold">Consultoria</NuxtLink>
          </div>
        </div>

        <div class="gold-divider mb-8" />

        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-xs text-center text-speakeasy-champagne/40 uppercase tracking-widest">
            © {{ new Date().getFullYear() }} The Prohibition Pour. Todos os direitos reservados.
          </p>
          <div class="flex gap-6">
            <span class="text-xs text-speakeasy-champagne/40 uppercase tracking-widest cursor-pointer hover:text-speakeasy-gold transition-colors">Privacidade</span>
            <span class="text-xs text-speakeasy-champagne/40 uppercase tracking-widest cursor-pointer hover:text-speakeasy-gold transition-colors">Termos</span>
          </div>
        </div>
    </div>
  </footer>
</template>
