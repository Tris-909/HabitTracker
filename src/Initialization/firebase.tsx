import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEZHV13wmxGokJoKOHTOkm2cWUo_lIn20",
  authDomain: "habittracker-abc92.firebaseapp.com",
  projectId: "habittracker-abc92",
  storageBucket: "habittracker-abc92.appspot.com",
  messagingSenderId: "726213096111",
  appId: "1:726213096111:web:2b0d038574813ef6079a5a",
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
