import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect, createContext, useContext } from "react";

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
export const AuthContext = createContext({});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(getAuth(), setUser, setError);

    return unsubcribe;
  }, []);

  return <AuthContext.Provider value={{ user, error }} {...props} />;
};
export const useAuthState = () => {
  const auth = useContext(AuthContext);

  return { ...auth, isAuthenticated: auth.user !== null, user: auth.user };
};
