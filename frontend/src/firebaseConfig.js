import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpiGRjYvgayUj1sOg7XGj010vZanq6ZO8",
  authDomain: "message-scanner-extension.firebaseapp.com",
  projectId: "message-scanner-extension",
  storageBucket: "message-scanner-extension.firebasestorage.app",
  messagingSenderId: "437677363924",
  appId: "1:437677363924:web:6e1e897a26feab62692141",
  measurementId: "G-9Z7ZSHKZQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);