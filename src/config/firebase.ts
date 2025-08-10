import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Validate that required environment variables are present
if (!process.env.REACT_APP_FIREBASE_API_KEY) {
    throw new Error('Missing Firebase configuration. Please check your environment variables.');
}

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
