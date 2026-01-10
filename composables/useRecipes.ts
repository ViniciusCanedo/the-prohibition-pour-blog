export interface Recipe {
  id: number
  slug: string
  title: string
  description: string
  story?: string
  image: string
  isAlcoholic: boolean
  country: string
  season: string | string[]
  tags: string[]
  ingredients: string[]
  steps: string[]
  notes?: string
  pairings?: string[]
  type: string
  family: string
  fruits: string[]
  prepTime: string
  rating: number
}

const mockRecipes: Recipe[] = [
  {
    id: 1,
    slug: "smoked-old-fashioned",
    title: "Smoked Old Fashioned",
    description: "A classic reinvented with hickory wood smoke and premium bourbon for a deep, mysterious profile.",
    story: "Born in the dimly lit corners of a 1920s underground speakeasy, the Smoked Old Fashioned was a secret shared only by those who knew the right knock. Legend has it that a traveling musician from Kentucky brought the technique of smoking hickory wood to a hidden bar in Manhattan, forever changing how we perceive this timeless classic. Each sip carries the ghost of jazz nights and whispered deals made in the haze of tobacco smoke.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
    tags: ["Classic", "Winter", "USA"],
    isAlcoholic: true,
    type: "Classic",
    family: "Classics",
    fruits: ["Orange"],
    country: "USA",
    season: "Winter",
    prepTime: "8 min",
    rating: 5.0,
    ingredients: [
      "60ml Bourbon",
      "1 Sugar cube",
      "2 dashes Angostura bitters",
      "Orange peel",
      "Luxardo cherry",
      "Hickory wood chips for smoking"
    ],
    steps: [
      "Place the sugar cube in a rocks glass and saturate with bitters.",
      "Muddle until dissolved.",
      "Fill the glass with large ice cubes.",
      "Add bourbon and stir gently for 30 seconds.",
      "Using a smoking gun, infuse hickory smoke into the glass.",
      "Cover briefly to trap the smoke.",
      "Garnish with expressed orange peel and a Luxardo cherry."
    ],
    notes: "The smoking adds depth without overpowering the bourbon. Use quality ice—larger cubes melt slower and dilute less.",
    pairings: ["Dark chocolate", "Grilled steak", "Aged cheddar"]
  },
  {
    id: 2,
    slug: "emerald-gin-fizz",
    title: "Emerald Gin Fizz",
    description: "Refreshing botanical gin paired with fresh lime and a touch of basil for a vibrant, garden-to-glass experience.",
    story: "The Emerald Gin Fizz was inspired by a summer morning in a French botanical garden. It was created by a visionary bartender who wanted to capture the essence of dew-covered herbs and the crispness of dawn. The vibrant green hue represents the life and energy of the spring season, making it a favorite for outdoor soirées and garden parties across the Riviera.",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1965&auto=format&fit=crop",
    tags: ["Signature", "Spring", "France"],
    isAlcoholic: true,
    type: "Signature",
    family: "Fizzes",
    fruits: ["Lime"],
    country: "France",
    season: "Spring",
    prepTime: "6 min",
    rating: 4.8,
    ingredients: [
      "50ml London Dry Gin",
      "25ml Fresh lime juice",
      "20ml Simple syrup",
      "4-5 Fresh basil leaves",
      "Soda water",
      "Egg white (optional)"
    ],
    steps: [
      "Gently muddle basil leaves in a shaker.",
      "Add gin, lime juice, simple syrup, and egg white if using.",
      "Dry shake vigorously for 15 seconds.",
      "Add ice and shake again until well chilled.",
      "Double strain into a highball glass with fresh ice.",
      "Top with soda water.",
      "Garnish with a basil sprig and lime wheel."
    ],
    notes: "Don't over-muddle the basil—you want the aromatic oils, not bitterness from the stems.",
    pairings: ["Fresh oysters", "Cucumber salad", "Light fish dishes"]
  },
  {
    id: 3,
    slug: "midnight-mule",
    title: "The Midnight Mule",
    description: "A dark twist on the mule featuring black vodka, spicy ginger beer, and a hint of muddled blackberries.",
    story: "When the clock strikes twelve and the moon is at its peak, the Midnight Mule emerges. This cocktail was designed for those who embrace the mystery of the night. Originating from a high-stakes poker game in a coastal Mexican town, it was meant to be as bold and dark as the shadows it was served in. The blackberries add a subtle sweetness that hides the bite of the ginger.",
    image: "https://images.unsplash.com/photo-1597290282695-edc43d0e7129?q=80&w=2075&auto=format&fit=crop",
    tags: ["Cocktail", "Autumn", "Mexico"],
    isAlcoholic: true,
    type: "Cocktail",
    family: "Highballs",
    fruits: ["Berries", "Lime"],
    country: "Mexico",
    season: "Autumn",
    prepTime: "5 min",
    rating: 4.9,
    ingredients: [
      "50ml Black vodka",
      "20ml Fresh lime juice",
      "6-8 Fresh blackberries",
      "120ml Spicy ginger beer",
      "Lime wedge for garnish"
    ],
    steps: [
      "Muddle blackberries in a copper mug or rocks glass.",
      "Add black vodka and lime juice.",
      "Fill with crushed ice.",
      "Top with spicy ginger beer.",
      "Stir gently to combine.",
      "Garnish with lime wedge and fresh blackberries."
    ],
    notes: "The black vodka creates a stunning visual effect. If unavailable, add a few drops of activated charcoal to regular vodka."
  },
  {
    id: 4,
    slug: "virgin-pineapple-mojito",
    title: "Virgin Pineapple Mojito",
    description: "A non-alcoholic delight with fresh mint, lime, and tropical pineapple, topped with crisp soda water.",
    story: "In the heart of Old Havana, where the sun kisses the sea, a local vendor created this non-alcoholic masterpiece for those who wanted the spirit of the island without the punch of rum. It captures the tropical breeze and the sweetness of sun-ripened pineapples, offering a refreshing escape from the Caribbean heat. It's the taste of a perfect vacation in a glass.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1974&auto=format&fit=crop",
    tags: ["Mocktail", "Summer", "Cuba"],
    isAlcoholic: false,
    type: "Mocktail",
    family: "Tiki",
    fruits: ["Pineapple", "Lime"],
    country: "Cuba",
    season: "Summer",
    prepTime: "7 min",
    rating: 4.7,
    ingredients: [
      "60ml Fresh pineapple juice",
      "30ml Fresh lime juice",
      "20ml Simple syrup",
      "8-10 Fresh mint leaves",
      "Soda water",
      "Pineapple wedge and mint sprig for garnish"
    ],
    steps: [
      "Gently muddle mint leaves with simple syrup in a highball glass.",
      "Add pineapple juice and lime juice.",
      "Fill glass with crushed ice.",
      "Top with soda water and stir gently.",
      "Garnish with a pineapple wedge and fresh mint sprig.",
      "Serve with a reusable straw."
    ],
    notes: "For extra tropical vibes, use coconut sugar in your simple syrup.",
    pairings: ["Grilled shrimp", "Tropical fruit salad", "Spicy tacos"]
  },
  {
    id: 5,
    slug: "spiced-apple-martini",
    title: "Spiced Apple Martini",
    description: "Crisp apple brandy balanced with cinnamon-infused simple syrup and fresh lemon juice.",
    story: "This martini is a tribute to the harvest festivals of the American Northeast. Imagine a crisp October evening, the air filled with the scent of fallen leaves and woodsmoke. A local distiller combined his finest apple brandy with spices from the kitchen to create a drink that warms the soul as much as it delights the palate. It's autumn in liquid form.",
    image: "https://anothercocktailblog.com/wp-content/uploads/2021/11/Caramel-Apple-Martini-2.jpg",
    tags: ["Cocktail", "Autumn", "USA"],
    isAlcoholic: true,
    type: "Cocktail",
    family: "Sours",
    fruits: ["Apple", "Lemon"],
    country: "USA",
    season: "Autumn",
    prepTime: "6 min",
    rating: 4.6,
    ingredients: [
      "50ml Apple brandy",
      "25ml Fresh lemon juice",
      "20ml Cinnamon simple syrup",
      "15ml Apple cider",
      "Apple slice and cinnamon stick for garnish"
    ],
    steps: [
      "Add all liquid ingredients to a shaker with ice.",
      "Shake vigorously until well chilled.",
      "Double strain into a chilled martini glass.",
      "Garnish with a thin apple slice and cinnamon stick.",
      "Optionally, dust with ground cinnamon."
    ],
    notes: "Make cinnamon syrup by simmering equal parts sugar and water with 2-3 cinnamon sticks for 10 minutes.",
    pairings: ["Apple pie", "Brie cheese", "Roasted pork"]
  },
  {
    id: 6,
    slug: "negroni-classico",
    title: "Negroni Classico",
    description: "The timeless balance of gin, vermouth rosso, and Campari, garnished with a fresh orange peel.",
    story: "The Negroni was famously born in Florence when Count Camillo Negroni asked his bartender to strengthen his favorite Americano cocktail by replacing the soda water with gin. Since that day in 1919, it has become the gold standard of sophisticated simplicity. It is a drink of culture, history, and the perfect bitter-sweet harmony that defines the Italian 'aperitivo' hour.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2157&auto=format&fit=crop",
    tags: ["Classic", "Summer", "Italy"],
    isAlcoholic: true,
    type: "Classic",
    family: "Classics",
    fruits: ["Orange"],
    country: "Italy",
    season: ["Summer", "Autumn"],
    prepTime: "5 min",
    rating: 4.9,
    ingredients: [
      "30ml Gin",
      "30ml Campari",
      "30ml Sweet Vermouth",
      "Orange peel"
    ],
    steps: [
      "Fill a mixing glass with ice.",
      "Add gin, Campari, and sweet vermouth.",
      "Stir until well chilled, about 30 seconds.",
      "Strain over a large ice cube into a rocks glass.",
      "Express orange peel over the drink and drop it in."
    ],
    notes: "Balance is key. Adjust vermouth for a softer profile, or try with mezcal for a smoky variation.",
    pairings: ["Charcuterie", "Aged cheese", "Olives"]
  }
]

export function useRecipes() {
  const getRecipeBySlug = (slug: string): Recipe | undefined => {
    return mockRecipes.find(recipe => recipe.slug === slug)
  }

  const getAllRecipes = (): Recipe[] => {
    return mockRecipes
  }

  const getRelatedRecipes = (currentSlug: string, limit: number = 3): Recipe[] => {
    const currentRecipe = getRecipeBySlug(currentSlug)
    if (!currentRecipe) return mockRecipes.slice(0, limit)

    return mockRecipes
      .filter(recipe => recipe.slug !== currentSlug)
      .filter(recipe => 
        recipe.family === currentRecipe.family ||
        recipe.type === currentRecipe.type ||
        recipe.tags.some(tag => currentRecipe.tags.includes(tag))
      )
      .slice(0, limit)
  }

  return {
    getRecipeBySlug,
    getAllRecipes,
    getRelatedRecipes
  }
}
