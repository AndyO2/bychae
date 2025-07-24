export interface MenuItem {
  id: number;
  name: string;
  description: string;
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
    popular: true,
    options: [
      { quantity: 2, price: 8.50 },
      { quantity: 3, price: 11.50 },
      { quantity: 4, price: 14.50 }
    ],
    image: "/images/breaking-buns/bao/bao-tofu.jpg"
  },
  {
    id: 3,
    name: "Szechuan Chicken Bao",
    description: "Chicken thighs, Mushrooms and Napa Cabbage simmered in Szechuan sauce and topped with Scallions and Chopped Peanuts",
    price: 8.00,
    category: Category.bao,
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
    options: [
      { quantity: 2, price: 8.50 },
      { quantity: 3, price: 11.50 },
      { quantity: 4, price: 14.50 }
    ],
    image: "/images/breaking-buns/bao/bao-short-rib.jpg"
  },
  {
    id: 5,
    name: "Pork Belly Bao",
    description: "Oven Roasted Pork Belly sauteed with Mushrooms and Napa Cabbage, glazed with Sweet Soy sauce and topped with Scallions, Chopped Peanuts and Szechuan Mayonnaise",
    price: 9.50,
    category: Category.bao,
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
    options: [
      { quantity: 2, price: 9.50 },
      { quantity: 3, price: 12.50 },
      { quantity: 4, price: 15.00 }
    ],
    image: "/images/breaking-buns/bao/bao-short-rib.jpg"
  },
  {
    id: 7,
    name: "Szechuan Cow Bao",
    description: "Braised Beef simmered in Szechuan sauce and topped with Namasu, Fried Shallots and Cilantro",
    price: 9.50,
    category: Category.bao,
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
    options: [
      { quantity: 2, price: 9.50 },
      { quantity: 3, price: 12.50 },
      { quantity: 4, price: 15.00 }
    ],
    image: "/images/breaking-buns/bao/bao-short-rib.jpg"
  },
  {
    id: 9,
    name: "Spicy Shrimp Bao",
    description: "Mirin Poached Shrimp simmered in Szechuan sauce and topped with Daikon Radish, Edamame, Cilantro, Szechuan Mayonnaise and Sweet Soy Sauce",
    price: 9.50,
    category: Category.bao,
    options: [
      { quantity: 2, price: 9.50 },
      { quantity: 3, price: 12.50 },
      { quantity: 4, price: 15.00 }
    ],
    image: "/images/breaking-buns/bao/bao-short-rib.jpg"
  },

  // Noodles
  {
    id: 10,
    name: "Yakisoba",
    description: "Locally made Japanese Yakisoba noodles, Mushrooms, Onions, Bean Sprouts and Napa Cabbage wok fried in traditional house made Yakisoba sauce and topped with Namasu, Scallions, Cilantro and chopped Peanuts",
    price: 11.00,
    category: Category.noodles,
    popular: true,
    image: "/images/breaking-buns/yakisoba/chicken-yakisoba.jpg",
  },
  {
    id: 11,
    name: "Vietnamese Cold Noodle Salad",
    description: "Vermicelli, bean sprouts, cucumber, cilantro, scallion, and Thai basil, tossed in house made Shallot-Lime Vinaigrette and garnished with chopped Peanuts and Sweet Soy sauce",
    price: 8.00,
    category: Category.noodles, 
    image: "/images/breaking-buns/yakisoba/chicken-yakisoba.jpg",
  },
  // Fried Rice
  {
    id: 15,
    name: "Pork Belly Fried Rice",
    description: "Japanese cut, lean Pork Bellies seasoned with Asian chili's and spices, oven roasted then Wok seared",
    price: 4.50,
    category: Category.rice,
    image: "/images/breaking-buns/yakisoba/chicken-yakisoba.jpg",
  },
  {
    id: 16,
    name: "Shrimp Fried Rice",
    description: "Fried Rice with Shrimp",
    price: 4.50,
    category: Category.rice,
    image: "/images/breaking-buns/fried-rice/shrimp.jpg"
  },
  {
    id: 17,
    name: "Vegetable Fried Rice",
    description: "Fried Rice no protein",
    price: 4.50,
    category: Category.rice,
    image: "/images/breaking-buns/fried-rice/vegetable.jpg"
  },
  {
    id: 18,
    name: "Tofu Fried Rice",
    description: "Fried Rice no protein",
    price: 4.50,
    category: Category.rice,
    image: "/images/breaking-buns/fried-rice/tofu.jpg"
  },
];

export const categories = [
  { id: Category.all, name: 'All Items' },
  { id: Category.bao, name: 'Gua Bao' },
  { id: Category.noodles, name: 'Noodles' },
  { id: Category.rice, name: 'Fried Rice' }
]; 