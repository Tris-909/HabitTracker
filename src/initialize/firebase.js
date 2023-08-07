import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect, createContext, useContext } from "react";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGER_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
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
