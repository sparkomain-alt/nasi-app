import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'nasi-c5f24.firebaseapp.com',
  databaseURL: 'https://nasi-c5f24-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'nasi-c5f24',
  storageBucket: 'nasi-c5f24.firebasestorage.app',
  messagingSenderId: '161756533951',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: 'G-LVK0TGX3ZR',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]!;

export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);

export const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));

export default app;
