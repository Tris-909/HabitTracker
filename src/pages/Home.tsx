import { useEffect } from "react";
import { db, useAuthState } from "initialization/firebase";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  serverTimestamp,
  documentId,
  doc,
  query,
  where,
} from "firebase/firestore";

export const HomePage = () => {
  const auth = getAuth();
  const { user } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    initializeUser(user?.email);
  }, [user?.email]);

  const initializeUser = async (email: string) => {
    if (email) {
      const queries = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const { docs } = await getDocs(queries);
      const currentUser = docs[0]?.data();

      if (!currentUser) {
        addDoc(collection(db, "users"), {
          email: email,
          createdAt: serverTimestamp(),
        });
      }
    }
  };

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out Successfully");
        navigate("/auth");
      })
      .catch((error) => {
        console.log("error signing out", error.message);
      });
  };

  return <Button onClick={() => signOutHandler()}>Sign Out</Button>;
};
