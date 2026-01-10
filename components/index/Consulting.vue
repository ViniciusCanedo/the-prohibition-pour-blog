<script setup lang="ts">
// No extra logic needed for consulting
</script>

<template>
  <section id="consulting" class="py-12 md:py-24 bg-speakeasy-nearBlack relative">
    <div class="container max-w-7xl mx-auto px-6">
        <div class="max-w-4xl mx-auto glass-dark rounded-2xl p-6 md:p-12 border border-speakeasy-brown/20 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-speakeasy-gold/5 blur-3xl rounded-full -mr-32 -mt-32" />
          
            <div class="relative z-10 text-center mb-12">
              <h2 class="text-4xl md:text-6xl display-font text-speakeasy-white mb-6">
                Consultoria <span class="text-speakeasy-gold">Humanizada</span>
              </h2>
              <p class="text-speakeasy-champagne/70 font-body max-w-2xl mx-auto">
                Precisa de ajuda especializada? Solicite um orçamento personalizado para consultoria focada em estratégia de bar, design de menu e experiência.
              </p>
            </div>

            <form class="grid md:grid-cols-2 gap-6 relative z-10">
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-widest text-speakeasy-gold font-bold">Nome</label>
                <input 
                  type="text" 
                  class="w-full bg-speakeasy-nearBlack/50 border border-speakeasy-brown/30 rounded-full px-6 py-5 md:py-4 text-speakeasy-white focus:outline-none focus:border-speakeasy-gold/50 transition-colors" 
                  placeholder="Nome Completo"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-widest text-speakeasy-gold font-bold">E-mail</label>
                <input 
                  type="email" 
                  class="w-full bg-speakeasy-nearBlack/50 border border-speakeasy-brown/30 rounded-full px-6 py-5 md:py-4 text-speakeasy-white focus:outline-none focus:border-speakeasy-gold/50 transition-colors" 
                  placeholder="seu@email.com"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-widest text-speakeasy-gold font-bold">WhatsApp</label>
                <input 
                  type="tel" 
                  class="w-full bg-speakeasy-nearBlack/50 border border-speakeasy-brown/30 rounded-full px-6 py-5 md:py-4 text-speakeasy-white focus:outline-none focus:border-speakeasy-gold/50 transition-colors" 
                  placeholder="+55 (11) 99999-9999"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-widest text-speakeasy-gold font-bold">Nome da Empresa</label>
                <input 
                  type="text" 
                  class="w-full bg-speakeasy-nearBlack/50 border border-speakeasy-brown/30 rounded-full px-6 py-5 md:py-4 text-speakeasy-white focus:outline-none focus:border-speakeasy-gold/50 transition-colors" 
                  placeholder="Seu Bar ou Restaurante"
                />
              </div>
              <div class="space-y-2 md:col-span-2">
                <label class="text-xs uppercase tracking-widest text-speakeasy-gold font-bold">Mensagem</label>
                <textarea 
                  :rows="4"
                  class="w-full bg-speakeasy-nearBlack/50 border border-speakeasy-brown/30 rounded-2xl px-6 py-5 md:py-4 text-speakeasy-white focus:outline-none focus:border-speakeasy-gold/50 transition-colors resize-none" 
                  placeholder="Como podemos ajudar seu negócio a prosperar?"
                ></textarea>
              </div>
              <div class="md:col-span-2 text-center mt-4">
                <button class="w-full md:w-auto px-12 py-5 md:py-4 rounded-full bg-speakeasy-gold text-speakeasy-nearBlack font-bold hover:bg-speakeasy-amber transition-all duration-300 transform hover:scale-105 shadow-xl shadow-speakeasy-gold/10">
                  Solicitar Orçamento
                </button>
              </div>
            </form>
        </div>
    </div>
  </section>
</template>
