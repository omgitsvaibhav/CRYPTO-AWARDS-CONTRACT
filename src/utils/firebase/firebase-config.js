// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFWpkRiJcpKWt2Em1-xvbLiJgHlBZLCYc",
  authDomain: "cryptoawards-98f49.firebaseapp.com",
  databaseURL: "https://cryptoawards-98f49-default-rtdb.firebaseio.com",
  projectId: "cryptoawards-98f49",
  storageBucket: "cryptoawards-98f49.appspot.com",
  messagingSenderId: "217618440974",
  appId: "1:217618440974:web:46eb6325bdb9afdaac6d5f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
