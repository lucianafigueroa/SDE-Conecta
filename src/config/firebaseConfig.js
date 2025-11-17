import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// --- 1. Importa enablePersistence ---
import { getFirestore, enablePersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// Inicialización de Firebase Authentication
// (Esto ya estaba correcto)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Inicialización de Cloud Firestore
export const db = getFirestore(app);

// --- 2. Habilita la persistencia de Firestore ---
enablePersistence(db)
  .then(() => console.log("Persistencia de Firestore habilitada."))
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // Múltiples pestañas de la app abiertas
      console.warn("Error de persistencia: Múltiples pestañas abiertas.");
    } else if (err.code == 'unimplemented') {
      // El dispositivo no soporta persistencia
      console.warn("Error de persistencia: No soportado en este dispositivo.");
    }
  });
// ---

// Inicialización de Storage
export const storage = getStorage(app);