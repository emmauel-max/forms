// Firebase placeholder configuration
// Replace these values with your actual Firebase project settings
// IMPORTANT: Use environment variables (e.g., import.meta.env.VITE_API_KEY) for real credentials.
// Never commit real Firebase credentials to version control.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (placeholder - won't actually connect without real config)
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
