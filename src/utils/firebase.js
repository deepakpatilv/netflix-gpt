// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO59Tk1EMh-Hj0rK4HVSsu_Hb1gI0wSQI",
  authDomain: "netflixgpt-c768b.firebaseapp.com",
  projectId: "netflixgpt-c768b",
  storageBucket: "netflixgpt-c768b.appspot.com",
  messagingSenderId: "1050406581581",
  appId: "1:1050406581581:web:3bc86ec83441bbb3d4f304",
  measurementId: "G-X07JFDB50V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();