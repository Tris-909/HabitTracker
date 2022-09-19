import { useEffect } from "react";
import { db } from "initialization/firebase";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export const HomePage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const email = "tranminhtri9090@gmail.com";

  // useEffect(() => {
  //   initializeUser();
  // }, []);

  // const initializeUser = async () => {
  //   const getUserQuery = doc(db, "users", email);
  //   const user = await getDoc(getUserQuery);
  //   console.log("user", user);

  //   if (user.exists()) {
  //     const createdUser = await setDoc(doc(db, "users", "email"), {
  //       email: email,
  //       createdAt: serverTimestamp(),
  //     });
  //     console.log("createdUser", createdUser);
  //   }
  // };

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
