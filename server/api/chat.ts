export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  const responses = [
    "A fine choice. For a speakeasy, I'd suggest focusing on classics with a modern twist — perhaps a Smoked Old Fashioned or a clarified Clover Club.",
    "Pairing drinks with food is an art. For a tasting menu, we should look at the weight and acidity of each dish. Shall we start with the appetizers?",
    "Non-alcoholic options deserve the same complexity as their spirited cousins. Think seed-based botanicals and high-quality tonics.",
    "Pricing is about balance. You want to reflect the quality of your ingredients while remaining accessible to your target audience."
  ]
  
  const text = responses[Math.floor(Math.random() * responses.length)]
  
  // Set headers for SSE
  setResponseHeader(event, 'Content-Type', 'text/event-stream')
  setResponseHeader(event, 'Cache-Control', 'no-cache')
  setResponseHeader(event, 'Connection', 'keep-alive')

  const eventStream = createEventStream(event)

  // Split text into smaller chunks to simulate more frequent SSE delivery
  const chunks: string[] = []
  let remaining = text
  while (remaining.length > 0) {
    // Small chunks of 5-15 characters for a "streaming" feel
    const chunkSize = Math.floor(Math.random() * 10) + 5
    chunks.push(remaining.slice(0, chunkSize))
    remaining = remaining.slice(chunkSize)
  }

  // Use an interval to send chunks
  // We need to run this in a way that doesn't block the handler but also ensures the stream is managed
  // However, Nitro event handlers can be async and stay open for streams
  for (const chunk of chunks) {
    await eventStream.push({ data: JSON.stringify({ chunk }) })
    // Natural variation in chunk delivery speed
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 150))
  }

  await eventStream.close()
})
