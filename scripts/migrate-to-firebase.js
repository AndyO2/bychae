const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

// Import the existing menu data
const { menuItems } = require("../src/data/menuData");

// Firebase configuration - replace with your actual values
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateMenuData() {
  try {
    console.log("Starting migration of menu data to Firebase...");

    const collectionRef = collection(db, "menuItems");

    for (const item of menuItems) {
      // Convert the item to Firebase format
      const firebaseItem = {
        name: item.name,
        description: item.description || "",
        price: item.price,
        category: item.category,
        popular: item.popular || false,
        options: item.options || [],
        image: item.image || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add to Firebase
      const docRef = await addDoc(collectionRef, firebaseItem);
      console.log(`✅ Added "${item.name}" with ID: ${docRef.id}`);
    }

    console.log("🎉 Migration completed successfully!");
    console.log(`Migrated ${menuItems.length} menu items to Firebase.`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  // Load environment variables
  require("dotenv").config();

  if (!process.env.REACT_APP_FIREBASE_PROJECT_ID) {
    console.error(
      "❌ Firebase configuration not found in environment variables."
    );
    console.log(
      "Please make sure you have a .env file with Firebase configuration."
    );
    process.exit(1);
  }

  migrateMenuData();
}

module.exports = { migrateMenuData };
