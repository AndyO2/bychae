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
    tiktok?: string;
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
export const byChaeConfig: FoodCartConfig = {
  name: "By:CHAE",
  tagline: "BY CHAE, FOR YOU.",
  description: "Handcrafted matcha treats made with premium Japanese green tea. Every sip and bite is a moment of pure joy.",

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
    heroImage: "/images/1.png",
    logoImage: "/images/1.png",
    backgroundImage: "/images/bao-background.jpg"
  },

  socialMedia: {
    instagram: "@craftedbychae",
    tiktok: "@bychae"
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

// Configuration selector - change this to switch between food carts
export const currentConfig: FoodCartConfig = byChaeConfig; 