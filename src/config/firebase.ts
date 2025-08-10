import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdN9vOzMgJiLIctrs2eXiCUs2o0R_GIcE",
    authDomain: "cartify-378a6.firebaseapp.com",
    projectId: "cartify-378a6",
    storageBucket: "cartify-378a6.firebasestorage.app",
    messagingSenderId: "644537028667",
    appId: "1:644537028667:web:839fd55e8469f933bf0c1e",
    measurementId: "G-TPDW35T4GM"
};

// Initialize Firebase only if no apps exist
let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment and if supported)
export const analytics = (async () => {
    if (typeof window !== 'undefined') {
        const analyticsSupported = await isSupported();
        if (analyticsSupported) {
            return getAnalytics(app);
        }
    }
    return null;
})();

export default app;
