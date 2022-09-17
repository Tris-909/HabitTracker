import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

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
