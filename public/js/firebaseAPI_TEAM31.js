// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQiBwI8IU3gFUnv4ML80V04LqtJL3q268",
  authDomain: "bby31-7f183.firebaseapp.com",
  projectId: "bby31-7f183",
  storageBucket: "bby31-7f183.appspot.com",
  messagingSenderId: "499251907282",
  appId: "1:499251907282:web:f4e5de098b196c3af1fb0b",
  measurementId: "G-W1JBD9K2GT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);