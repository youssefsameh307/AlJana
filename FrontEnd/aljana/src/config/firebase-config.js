// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// adding your firebase config here

import firebase from 'firebase/app';
import 'firebase/analytics';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZeFY-yF3KTtcvarFHXEeIEtYIAY0LjFE",
  authDomain: "aljana-7def1.firebaseapp.com",
  projectId: "aljana-7def1",
  storageBucket: "aljana-7def1.appspot.com",
  messagingSenderId: "106748311256",
  appId: "1:106748311256:web:266c8d949d7089438f49ad",
  measurementId: "G-XZ0F89GX92",
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app };
