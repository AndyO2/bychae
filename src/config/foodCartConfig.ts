export interface FoodCartConfig {
  // Basic Info
  name: string;
  tagline: string;
  description: string;
  
  // Contact Info
  phone: string;
  email: string;
  address: string;
  
  // Hours
  hours: {
    [key: string]: string;
  };
  
  // Branding
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  
  // Assets
  assets: {
    heroImage?: string;
    menuImages?: { [key: string]: string };
    logoImage?: string;
    backgroundImage?: string;
  };
  
  // Social Media
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  
  // Features
  features: {
    hasDelivery: boolean;
    hasPickup: boolean;
    hasCatering: boolean;
    acceptsOnlineOrders: boolean;
  };
  
  // API Keys (from environment variables)
  apiKeys?: {
    googleMaps?: string;
  };
  
  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// Default configuration for Breaking Buns PDX
export const breakingBunsConfig: FoodCartConfig = {
  name: "BREAKING BUNS",
  tagline: "AUTHENTIC ASIAN STREET FOOD",
  description: "Fresh, flavorful Gua Bao (steamed buns) and noodles made with love. Breaking Buns PDX brings authentic Asian street food to Portland.",
  
  phone: "(503) 728-8207",
  email: "breakingbunspdx@gmail.com",
  address: "5523 SE 28th Ave, Portland, OR 97202",
  
  hours: {
    "Monday-Thursday": "3pm-11pm",
    "Friday-Saturday": "12pm-11pm",
    "Sunday": "Closed"
  },
  
  logo: "🥟",
  favicon: "/favicon.ico",
  primaryColor: "#1a1a1a",
  secondaryColor: "#f5f5f5",
  
  assets: {
    heroImage: "/images/breaking-buns/breaking-buns-food-cart.jpg",
    logoImage: "/images/breaking-buns-logo.png",
    backgroundImage: "/images/bao-background.jpg"
  },
  
  socialMedia: {
    instagram: "@breaking_buns",
    facebook: "Breaking-Buns-Food-Cart-100064707978866"
  },
  
  features: {
    hasDelivery: false,
    hasPickup: true,
    hasCatering: true,
    acceptsOnlineOrders: true
  },
  
  apiKeys: {
    googleMaps: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  },
  
  seo: {
    title: "Breaking Buns PDX - Authentic Asian Street Food in Portland",
    description: "Authentic Gua Bao (steamed buns) and Asian street food in Portland. Fresh ingredients, made with love.",
    keywords: ["bao", "asian food", "portland", "food truck", "steamed buns", "yakisoba", "noodles"]
  }
};

// Example configuration for a different food cart
export const tacoTruckConfig: FoodCartConfig = {
  name: "Taco Truck Deluxe",
  tagline: "Authentic Mexican Street Tacos",
  description: "Fresh, authentic Mexican street tacos made with traditional recipes and the finest ingredients.",
  
  phone: "(555) 123-4567",
  email: "info@tacotruckdeluxe.com",
  address: "123 Main St, Portland, OR 97201",
  
  hours: {
    "Monday-Friday": "11am-9pm",
    "Saturday-Sunday": "12pm-10pm"
  },
  
  logo: "🌮",
  favicon: "/favicon.ico",
  primaryColor: "#e74c3c",
  secondaryColor: "#f39c12",
  
  assets: {
    heroImage: "/images/hero-tacos.jpg",
    logoImage: "/images/taco-truck-logo.png",
    backgroundImage: "/images/taco-background.jpg"
  },
  
  socialMedia: {
    instagram: "@tacotruckdeluxe",
    facebook: "TacoTruckDeluxe"
  },
  
  features: {
    hasDelivery: true,
    hasPickup: true,
    hasCatering: true,
    acceptsOnlineOrders: true
  },
  
  seo: {
    title: "Taco Truck Deluxe - Authentic Mexican Tacos in Portland",
    description: "Authentic Mexican street tacos in Portland. Fresh ingredients, traditional recipes.",
    keywords: ["tacos", "mexican food", "portland", "food truck", "street tacos", "authentic"]
  }
};

// Example configuration for a burger cart
export const burgerCartConfig: FoodCartConfig = {
  name: "Burger Cart",
  tagline: "Gourmet Burgers & Fries",
  description: "Handcrafted gourmet burgers made with premium beef and fresh ingredients. The best burgers in town!",
  
  phone: "(555) 987-6543",
  email: "info@burgercart.com",
  address: "456 Oak St, Portland, OR 97202",
  
  hours: {
    "Monday-Saturday": "11am-10pm",
    "Sunday": "12pm-8pm"
  },
  
  logo: "🍔",
  favicon: "/favicon.ico",
  primaryColor: "#8e44ad",
  secondaryColor: "#e67e22",
  
  assets: {
    heroImage: "/images/hero-burger.jpg",
    logoImage: "/images/burger-cart-logo.png",
    backgroundImage: "/images/burger-background.jpg"
  },
  
  socialMedia: {
    instagram: "@breakingbunspdx",
    facebook: "BreakingBunsPDX"
  },
  
  features: {
    hasDelivery: false,
    hasPickup: true,
    hasCatering: true,
    acceptsOnlineOrders: true
  },
  
  seo: {
    title: "Burger Cart - Gourmet Burgers in Portland",
    description: "Gourmet burgers and fries in Portland. Premium beef, fresh ingredients, amazing taste.",
    keywords: ["burgers", "gourmet", "portland", "food truck", "beef", "fries"]
  }
};

// Example configuration for a pizza truck
export const pizzaTruckConfig: FoodCartConfig = {
  name: "Pizza Truck",
  tagline: "Artisan Wood-Fired Pizzas",
  description: "Authentic Italian pizzas cooked in our wood-fired oven. Fresh ingredients, traditional recipes.",
  
  phone: "(555) 456-7890",
  email: "info@pizzatruck.com",
  address: "789 Pine St, Portland, OR 97203",
  
  hours: {
    "Tuesday-Saturday": "4pm-11pm",
    "Sunday-Monday": "Closed"
  },
  
  logo: "🍕",
  favicon: "/favicon.ico",
  primaryColor: "#c0392b",
  secondaryColor: "#f1c40f",
  
  assets: {
    heroImage: "/images/hero-pizza.jpg",
    logoImage: "/images/pizza-truck-logo.png",
    backgroundImage: "/images/pizza-background.jpg"
  },
  
  socialMedia: {
    instagram: "@pizzatruck",
    facebook: "PizzaTruck"
  },
  
  features: {
    hasDelivery: true,
    hasPickup: true,
    hasCatering: true,
    acceptsOnlineOrders: true
  },
  
  seo: {
    title: "Pizza Truck - Artisan Wood-Fired Pizzas in Portland",
    description: "Authentic Italian pizzas in Portland. Wood-fired oven, fresh ingredients, traditional recipes.",
    keywords: ["pizza", "italian", "portland", "food truck", "wood-fired", "artisan"]
  }
};

// Configuration selector - change this to switch between food carts
export const currentConfig: FoodCartConfig = breakingBunsConfig; 