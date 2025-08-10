const { initializeApp } = require("firebase/app");
const { getFirestore, doc, updateDoc } = require("firebase/firestore");
require("dotenv").config();

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdN9vOzMgJiLIctrs2eXiCUs2o0R_GIcE",
  authDomain: "cartify-378a6.firebaseapp.com",
  projectId: "cartify-378a6",
  storageBucket: "cartify-378a6.firebasestorage.app",
  messagingSenderId: "644537028667",
  appId: "1:644537028667:web:839fd55e8469f933bf0c1e",
  measurementId: "G-TPDW35T4GM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Menu items data (from your existing menuData.ts)
const menuItems = [
  // Gua Bao (Steamed Buns)
  {
    id: 1,
    name: "Classic Matcha",
    price: 6.0,
    category: "matcha",
    popular: true,
    image: "/images/matcha.png",
  },
  {
    id: 2,
    name: "Cream Top Matcha",
    price: 6.5,
    category: "matcha",
    popular: true,
    image: "/images/cream-top-matcha.png",
  },
  {
    id: 3,
    name: "Strawberry Cream Top Matcha",
    price: 6.75,
    category: "matcha",
    popular: true,
    image: "/images/gallery3.png",
  },
  // Coffee
  {
    id: 4,
    name: "Korean Latte",
    price: 5.5,
    category: "coffee",
    popular: false,
    image: "/images/korean-latte.png",
  },
  {
    id: 5,
    name: "Cream Top Latte",
    price: 6.0,
    category: "coffee",
    popular: false,
    image: "/images/cream-top-latte.png",
  },
  {
    id: 6,
    name: "Cold Brew",
    price: 5.0,
    category: "coffee",
    popular: false,
    image: "/images/coldbrew.png",
  },
  // Refresher
  {
    id: 7,
    name: "Strawberry Mint Mojito",
    price: 5.5,
    category: "refresher",
    popular: false,
    image: "/images/strawberry-mojito.png",
  },
  {
    id: 8,
    name: "Passion Fruit Mango Iced Tea",
    price: 5.5,
    category: "refresher",
    popular: false,
    image: "/images/passionfruit-mango-iced-tea.png",
  },
  {
    id: 9,
    name: "Peach Black Iced Tea",
    price: 5.5,
    category: "refresher",
    popular: false,
    image: "/images/peach-black-tea.png",
  },
  // Bread
  {
    id: 10,
    name: "CLASSIC CROISSANT",
    description: "FLAKY, CRISPY, GOLDEN, SWEET, MOIST, AND DELICATE",
    price: 4.0,
    category: "bread",
    popular: false,
    image: "/images/classic-croissant.png",
  },
  {
    id: 11,
    name: "CHOCOLATE CROISSANT",
    description: "SEMI-SWEET VALRHONA DARK FRENCH CHOCOLATE",
    price: 4.5,
    category: "bread",
    popular: false,
    image: "/images/chocolate-croissant.png",
  },
  {
    id: 12,
    name: "ALMOND CROISSANT",
    description:
      "MADE WITH ALMOND PASTE, GROUP ALMONDS, ALMOND FLOUR, ORGANIC CANE SUGAR, BUTTER, AND PURE ALMOND EXTRACT.",
    price: 4.5,
    category: "bread",
    popular: false,
    image: "/images/almond-croissant.png",
  },
  {
    id: 13,
    name: "STICKY BUN",
    description:
      "SWEET, STICKY, AND NUTTY -- MADE WITH ORGANIC PECANS, WILDFLOWER HONEY, AND BUTTERY CROISSANT DOUGH.",
    price: 5.0,
    category: "bread",
    popular: false,
    image: "/images/sticky-bun.png",
  },
  {
    id: 14,
    name: "PLAIN BAGEL + CREAM CHEESE",
    description:
      "CHEWY, GOLDEN, AND NATURALLY LEAVENED -- MADE WITH SIMPLE INGREDIENTS AND A SLOW FERMENTATION PROCESS.",
    price: 5.0,
    category: "bread",
    popular: false,
    image: "/images/bagel.png",
  },
];

async function populateTenantMenu() {
  try {
    console.log("🚀 Starting to populate tenant menu...");

    // Define menu categories
    const menuCategories = [
      { id: "matcha", name: "Matcha" },
      { id: "coffee", name: "Coffee" },
      { id: "refresher", name: "Refresher" },
      { id: "bread", name: "Bread" },
    ];

    // Update the specific tenant document with menu items and categories
    const tenantRef = doc(db, "tenants", "cVWbSMdGNtciwCpGQZNYUP7mB0K3");

    await updateDoc(tenantRef, {
      menuItems: menuItems,
      menu_categories: menuCategories,
    });

    console.log(
      "✅ Successfully updated tenant with menu items and categories!"
    );
    console.log(`📊 Added ${menuItems.length} menu items to tenant document`);
    console.log(
      `🏷️ Added ${menuCategories.length} menu categories to tenant document`
    );
    console.log("🎯 Menu items are now available at: tenant.menuItems");
    console.log(
      "🏷️ Menu categories are now available at: tenant.menu_categories"
    );
  } catch (error) {
    console.error("❌ Error populating tenant menu:", error);
    process.exit(1);
  }
}

// Run the migration
populateTenantMenu();
