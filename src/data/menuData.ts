export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  emoji?: string;
  popular?: boolean;
  options?: {
    quantity: number;
    price: number;
  }[];
  image?: string;
}

export enum Category {
  "rice",
  "bao",
  "noodles",
  "all"
}

export const menuItems: MenuItem[] = [
  // Gua Bao (Steamed Buns)
  {
    id: 1,
    name: "Ota Tofu Bao",
    description: "Ota Tofu coated in rice flour and house made togarashi and fried crisp, topped with Namasu, Edamame, Cilantro, Sweet Soy Sauce and Szechuan Mayonnaise",
    price: 8.00,
    category: Category.bao,
    emoji: "🥟",
    popular: true,
    options: [
      { quantity: 2, price: 8.00 },
      { quantity: 3, price: 11.00 },
      { quantity: 4, price: 14.00 }
    ],
    image: "/images/breaking-buns/bao/bao-tofu.jpg"
  },
  {
    id: 2,
    name: "Chicken Philly Cheesesteak Bao",
    description: "Chicken thighs, sauteed Bell Peppers, Mushrooms and Onions topped with Cheddar cheese, Szechuan mayonnaise and Thai basil",
    price: 8.50,
    category: Category.bao,
    emoji: "🥪",
    popular: true,
    options: [
      { quantity: 2, price: 8.50 },
      { quantity: 3, price: 11.50 },
      { quantity: 4, price: 14.50 }
    ]
  },
  {
    id: 3,
    name: "Szechuan Chicken Bao",
    description: "Chicken thighs, Mushrooms and Napa Cabbage simmered in Szechuan sauce and topped with Scallions and Chopped Peanuts",
    price: 8.00,
    category: Category.bao,
    emoji: "🍗",
    options: [
      { quantity: 2, price: 8.00 },
      { quantity: 3, price: 11.00 },
      { quantity: 4, price: 14.00 }
    ],
    image: "/images/breaking-buns/bao/bao-szechuan.jpg"
  },
  {
    id: 4,
    name: "Sweet & Spicy Orange Chicken Bao",
    description: "Chicken thighs, Bell Peppers and Onions simmered in Sweet Thai Chili sauce and topped with Korean Fire sauce, Fried Shallots and Cilantro",
    price: 8.50,
    category: Category.bao,
    emoji: "🍊",
    options: [
      { quantity: 2, price: 8.50 },
      { quantity: 3, price: 11.50 },
      { quantity: 4, price: 14.50 }
    ]
  },
  {
    id: 5,
    name: "Pork Belly Bao",
    description: "Oven Roasted Pork Belly sauteed with Mushrooms and Napa Cabbage, glazed with Sweet Soy sauce and topped with Scallions, Chopped Peanuts and Szechuan Mayonnaise",
    price: 9.50,
    category: Category.bao,
    emoji: "🥓",
    image: "/images/breaking-buns/guabao.jpg",
    popular: true,
    options: [
      { quantity: 2, price: 9.50 },
      { quantity: 3, price: 12.50 },
      { quantity: 4, price: 15.00 }
    ]
  },
  {
    id: 6,
    name: "BBQ Pork Rodeo Bao",
    description: "Oven Roasted Pork Belly sauteed with Mushrooms and Onions then simmered in Plum Tonkatsu and topped with Cheddar Cheese, Szechuan mayonnaise, Fried Shallots and Thai Basil",
    price: 9.50,
    category: Category.bao,
    emoji: "🍖",
    options: [
      { quantity: 2, price: 9.50 },
      { quantity: 3, price: 12.50 },
      { quantity: 4, price: 15.00 }
    ]
  },
  {
    id: 7,
    name: "Szechuan Cow Bao",
    description: "Braised Beef simmered in Szechuan sauce and topped with Namasu, Fried Shallots and Cilantro",
    price: 9.50,
    category: Category.bao,
    emoji: "🐄",
    options: [
      { quantity: 2, price: 9.50 },
      { quantity: 3, price: 12.50 },
      { quantity: 4, price: 15.00 }
    ],
    image: "/images/breaking-buns/bao/bao-short-rib.jpg",
  },
  {
    id: 8,
    name: "Braised Beef Tonkatsu Bao",
    description: "Braised Beef simmered in Plum Tonkatsu and topped with Pickled Onions, Cilantro, Szechuan mayonnaise and chopped Peanuts",
    price: 9.50,
    category: Category.bao,
    emoji: "🥩",
    options: [
      { quantity: 2, price: 9.50 },
      { quantity: 3, price: 12.50 },
      { quantity: 4, price: 15.00 }
    ]
  },
  {
    id: 9,
    name: "Spicy Shrimp Bao",
    description: "Mirin Poached Shrimp simmered in Szechuan sauce and topped with Daikon Radish, Edamame, Cilantro, Szechuan Mayonnaise and Sweet Soy Sauce",
    price: 9.50,
    category: Category.bao,
    emoji: "🦐",
    options: [
      { quantity: 2, price: 9.50 },
      { quantity: 3, price: 12.50 },
      { quantity: 4, price: 15.00 }
    ]
  },

  // Noodles
  {
    id: 10,
    name: "Yakisoba",
    description: "Locally made Japanese Yakisoba noodles, Mushrooms, Onions, Bean Sprouts and Napa Cabbage wok fried in traditional house made Yakisoba sauce and topped with Namasu, Scallions, Cilantro and chopped Peanuts",
    price: 11.00,
    category: Category.noodles,
    emoji: "🍜",
    popular: true,
    image: "/images/breaking-buns/yakisoba/chicken-yakisoba.jpg",
  },
  {
    id: 11,
    name: "Vietnamese Cold Noodle Salad",
    description: "Vermicelli, bean sprouts, cucumber, cilantro, scallion, and Thai basil, tossed in house made Shallot-Lime Vinaigrette and garnished with chopped Peanuts and Sweet Soy sauce",
    price: 8.00,
    category: Category.noodles,
    emoji: "🥗"
  },

  // Protein Add-ons
  {
    id: 12,
    name: "Ota Tofu (Fried)",
    description: "Ota Tofu coated in rice flour, togarashi and fried crisp",
    price: 2.50,
    category: Category.rice,
    emoji: "🧈"
  },
  {
    id: 13,
    name: "Ota Tofu (Raw)",
    description: "Raw Ota Tofu",
    price: 2.50,
    category: Category.rice,
    emoji: "🧈"
  },
  {
    id: 14,
    name: "Chicken",
    description: "Hand trimmed fresh chicken thighs seasoned in house made Togarashi, Wok seared and shredded",
    price: 3.50,
    category: Category.rice,
    emoji: "🍗",
    image: "/images/breaking-buns/yakisoba/chicken-yakisoba.jpg"
  },
  // Fried Rice
  {
    id: 15,
    name: "Pork Belly Fried Rice",
    description: "Japanese cut, lean Pork Bellies seasoned with Asian chili's and spices, oven roasted then Wok seared",
    price: 4.50,
    category: Category.rice,
    emoji: "🥓",
    image: "/images/breaking-buns/fried-rice/pork-belly.jpg"
  },
  {
    id: 16,
    name: "Shrimp Fried Rice",
    description: "Fried Rice with Shrimp",
    price: 4.50,
    category: Category.rice,
    emoji: "🦐",
    image: "/images/breaking-buns/fried-rice/shrimp.jpg"
  },
  {
    id: 17,
    name: "Vegetable Fried Rice",
    description: "Fried Rice no protein",
    price: 4.50,
    category: Category.rice,
    emoji: "🦐",
    image: "/images/breaking-buns/fried-rice/vegetable.jpg"
  },
  {
    id: 18,
    name: "Tofu Fried Rice",
    description: "Fried Rice no protein",
    price: 4.50,
    category: Category.rice,
    emoji: "🦐",
    image: "/images/breaking-buns/fried-rice/tofu.jpg"
  },
];

export const categories = [
  { id: Category.all, name: 'All Items' },
  { id: Category.bao, name: 'Gua Bao' },
  { id: Category.noodles, name: 'Noodles' },
  { id: Category.rice, name: 'Fried Rice' }
]; 