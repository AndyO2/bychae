export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: Category;
  popular?: boolean;
  options?: {
    quantity: number;
    price: number;
  }[];
  image?: string;
}

export enum Category {
  "matcha",
  "coffee",
  "refresher",
  "bread"
}

export const menuItems: MenuItem[] = [
  // Gua Bao (Steamed Buns)
  {
    id: 1,
    name: "Classic Matcha",
    price: 6.00,
    category: Category.matcha,
    popular: true,
    image: "/images/gallery3.png"
  },
  {
    id: 2,
    name: "Cream Top Matcha",
    price: 6.50,
    category: Category.matcha,
    popular: true,
    image: "/images/gallery3.png"  },
  {
    id: 3,
    name: "Strawberry Cream Top Matcha",
    price: 6.75,
    category: Category.matcha,
    popular: true,
    image: "/images/gallery3.png"
  },
  // Coffee
  {
    id: 4,
    name: "Korean Latte",
    price: 5.50,
    category: Category.coffee,
    popular: false,
    image: "/images/gallery3.png"
  },
  {
    id: 5,
    name: "Cream Top Latte",
    price: 6.00,
    category: Category.coffee,
    popular: false,
    image: "/images/gallery3.png"
  },
  {
    id: 6,
    name: "Cold Brew",
    price: 5.00,
    category: Category.coffee,
    popular: false,
    image: "/images/gallery3.png"
  },
  // Refresher
  {
    id: 7,
    name: "Strawberry Mint Mojito",
    price: 5.50,
    category: Category.refresher,
    popular: false,
    image: "/images/strawberry-mojito.png"
  },
  {
    id: 8,
    name: "Passion Fruit Mango Iced Tea",
    price: 5.50,
    category: Category.refresher,
    popular: false,
    image: "/images/passionfruit-mango-iced-tea.png"
  },
  {
    id: 9,
    name: "Peach Black Iced Tea",
    price: 5.50,
    category: Category.refresher,
    popular: false,
    image: "/images/peach-black-tea.png"
  },
  // Bread
  {
    id: 10,
    name: "CLASSIC CROISSANT",
    description: "FLAKY, CRISPY, GOLDEN, SWEET, MOIST, AND DELICATE",
    price: 4.00,
    category: Category.bread,
    popular: false,
    image: "/images/classic-croissant.png"
  },
  {
    id: 11,
    name: "CHOCOLATE CROISSANT",
    description: "SEMI-SWEET VALRHONA DARK FRENCH CHOCOLATE",
    price: 4.50,
    category: Category.bread,
    popular: false,
    image: "/images/chocolate-croissant.png"
  },
  {
    id: 12,
    name: "ALMOND CROISSANT",
    description: "MADE WITH ALMOND PASTE, GROUP ALMONDS, ALMOND FLOUR, ORGANIC CANE SUGAR, BUTTER, AND PURE ALMOND EXTRACT.",
    price: 4.50,
    category: Category.bread,
    popular: false,
    image: "/images/almond-croissant.png"
  },
  {
    id: 13,
    name: "STICKY BUN",
    description: "SWEET, STICKY, AND NUTTY -- MADE WITH ORGANIC PECANS, WILDFLOWER HONEY, AND BUTTERY CROISSANT DOUGH.",
    price: 5.00,
    category: Category.bread,
    popular: false,
    image: "/images/sticky-bun.png"
  },
  {
    id: 14,
    name: "PLAIN BAGEL + CREAM CHEESE",
    description: "CHEWY, GOLDEN, AND NATURALLY LEAVENED -- MADE WITH SIMPLE INGREDIENTS AND A SLOW FERMENTATION PROCESS.",
    price: 5.00,
    category: Category.bread,
    popular: false,
    image: "/images/bagel.png"
  },
];

export const categories = [
  { id: Category.matcha, name: 'Matcha' },
  { id: Category.coffee, name: 'Coffee' },
  { id: Category.refresher, name: 'Refresher' },
  { id: Category.bread, name: 'Bread' }
]; 