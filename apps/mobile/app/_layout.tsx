import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from '../store/authStore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'nasi-c5f24.firebaseapp.com',
  databaseURL: 'https://nasi-c5f24-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'nasi-c5f24',
  storageBucket: 'nasi-c5f24.firebasestorage.app',
  messagingSenderId: '161756533951',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

if (getApps().length === 0) initializeApp(firebaseConfig);

export default function RootLayout() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        router.replace('/(app)/map');
      } else {
        router.replace('/(auth)/onboarding');
      }
    });
    return unsub;
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
