// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeRdPeRO7U-NipOHueS6CvBRXcfMNpz_w",
  authDomain: "assistflow-46157.firebaseapp.com",
  projectId: "assistflow-46157",
  storageBucket: "assistflow-46157.firebasestorage.app",
  messagingSenderId: "143337861537",
  appId: "1:143337861537:web:6ff048d2fa38cd69a29be0",
  measurementId: "G-MH3VYMDVXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
