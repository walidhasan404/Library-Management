// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey || "AIzaSyBTeVCQhEkJQt-yEfRpUyadC1MpUFiiseE",
  authDomain: import.meta.env.VITE_authDomain || "library-management-86cd6.firebaseapp.com",
  projectId: import.meta.env.VITE_projectId || "library-management-86cd6",
  storageBucket: import.meta.env.VITE_storageBucket || "library-management-86cd6.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_messagingSenderId || "934479141838",
  appId: import.meta.env.VITE_appId || "1:934479141838:web:24f5da07a70e1e03d5a99f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;