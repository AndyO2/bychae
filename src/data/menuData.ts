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
];

export const categories = [
  { id: Category.all, name: 'All Items' },
  { id: Category.bao, name: 'Gua Bao' },
  { id: Category.noodles, name: 'Noodles' },
  { id: Category.rice, name: 'Fried Rice' }
]; 