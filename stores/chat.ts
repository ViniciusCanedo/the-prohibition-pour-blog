import { defineStore } from 'pinia'

export interface Message {
  id: string
  role: 'assistant' | 'user'
  text: string
  timestamp: Date
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],
    isTyping: false,
    suggestions: [
      "Create a cocktail menu for a speakeasy bar",
      "Suggest drink pairings for a tasting menu",
      "Design a non-alcoholic menu",
      "Help me price my drinks"
    ]
  }),
    actions: {
      addMessage(role: 'assistant' | 'user', text: string, delay?: number) {
        const newMessage: Message = {
          id: Date.now().toString(),
          role,
          text,
          timestamp: new Date()
        }
        this.messages.push(newMessage)
        
        if (role === 'user') {
          this.simulateAssistantResponse(delay)
        }
      },
        async simulateAssistantResponse(initialDelay?: number) {
          this.isTyping = true
          
          if (initialDelay) {
            await new Promise(resolve => setTimeout(resolve, initialDelay))
          }
          
          // Create empty assistant message for streaming
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          text: '',
          timestamp: new Date()
        }
        this.messages.push(assistantMessage)

        try {
            const responses = [
              // "# Classic Speakeasy Menu\n\nA fine choice. For a speakeasy, I'd suggest focusing on classics with a modern twist:\n\n* **Smoked Old Fashioned**: A deep, rich classic with a hint of campfire.\n* **Clarified Clover Club**: A crystal clear version of the raspberry gin favorite.\n\n> \"I like to have a martini, two at the very most. After three I'm under the table, after four I'm under my host.\"\n— *Dorothy Parker*",
              // "## Drink Pairings Guide\n\nPairing drinks with food is an art. For a tasting menu, we should look at the weight and acidity of each dish.\n\n### Recommended Pairings:\n1. **Appetizers**: Dry Champagne or a crisp Gin & Tonic.\n2. **Main Course**: Full-bodied Red Wine or a Whiskey Sour.\n3. **Dessert**: Espresso Martini or a sweet Port.\n\nShall we start with the appetizers?",
              // "## Non-Alcoholic Complexity\n\nNon-alcoholic options deserve the same complexity as their spirited cousins. \n\n### The Botanist's Garden (Mocktail)\n**Ingredients:**\n- 2oz Seed-based botanical spirit\n- 1oz Fresh lime juice\n- 0.5oz Cucumber syrup\n- Top with high-quality tonic\n\n**Steps:**\n1. Shake botanical spirit, lime, and syrup with ice.\n2. Strain into a chilled glass.\n3. Top with tonic and garnish with a cucumber ribbon.",
              "## Pricing Strategy\n\nPricing is about balance. You want to reflect the quality of your ingredients while remaining accessible to your target audience.\n\n| Item | Cost | Price | Margin |\n| :--- | :--- | :--- | :--- |\n| House Cocktail | $3.50 | $14.00 | 75% |\n| Premium Pour | $6.00 | $22.00 | 72% |\n| Beer/Wine | $2.50 | $9.00 | 72% |"
            ]
          
          const text = responses[Math.floor(Math.random() * responses.length)]
          
          // Simulate SSE-style chunking
          const chunks: string[] = []
          let remaining = text
          while (remaining.length > 0) {
            const chunkSize = Math.floor(Math.random() * 10) + 5
            chunks.push(remaining.slice(0, chunkSize))
            remaining = remaining.slice(chunkSize)
          }

          // Process each chunk like it was received from SSE
          for (const chunk of chunks) {
            // Artificial delay between chunks to simulate network
            await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200))
            
            // Animate each letter of the chunk
            for (const char of chunk) {
              assistantMessage.text += char
              // Dynamic delay for natural typing feel
              const delay = char === '.' || char === '?' || char === '!' ? 150 : 15 + Math.random() * 10
              await new Promise(resolve => setTimeout(resolve, delay))
            }
          }
        } catch (error) {
          console.error('Chat error:', error)
          assistantMessage.text = "I'm sorry, I'm having trouble connecting right now. Please try again."
        } finally {
          this.isTyping = false
        }
      }
  }
})
