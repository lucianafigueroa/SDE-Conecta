import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0RfIJ8OuXUBfCgNodMdqSOtIV78L2E0o",
  authDomain: "sde-conecta.firebaseapp.com",
  projectId: "sde-conecta",
  storageBucket: "sde-conecta.firebasestorage.app",
  messagingSenderId: "992150847499",
  appId: "1:992150847499:web:9d39ab419fd53fdd30070e",
  measurementId: "G-WJ5C441L0F",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
