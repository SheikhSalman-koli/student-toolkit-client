// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOYEbIyG9B6d5EhHCREatfD7wGyMK79Xw",
  authDomain: "toolkit-b9cd3.firebaseapp.com",
  projectId: "toolkit-b9cd3",
  storageBucket: "toolkit-b9cd3.firebasestorage.app",
  messagingSenderId: "734993788895",
  appId: "1:734993788895:web:3c7e367bf265e2fa2fde6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);