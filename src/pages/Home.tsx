import { useEffect, useState } from "react";
import { db, useAuthState } from "initialization/firebase";
import { getAuth, signOut } from "firebase/auth";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where,
  DocumentData,
} from "firebase/firestore";

export const HomePage = () => {
  const auth = getAuth();
  const { user } = useAuthState();
  const navigate = useNavigate();
  const [userFb, setUserFb] = useState<DocumentData>({});
  const [amount, setAmount] = useState("0");
  const [description, setDiscription] = useState("");
  const [title, setTitle] = useState("");

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
      setUserFb({ id: docs[0].id, ...currentUser });

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

  const createSavingGoal = async () => {
    addDoc(collection(db, "goals"), {
      title: title,
      goal: +amount,
      current: 0,
      description: description,
      parentId: userFb.id,
      userId: userFb.id,
      createdBy: user.email,
      createdAt: serverTimestamp(),
    });

    setAmount("0");
    setTitle("");
    setDiscription("");
  };

  return (
    <Box display={"flex"} flexDir="column">
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          type="string"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <FormLabel>Amount</FormLabel>
        <Input
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <FormLabel mt="1rem">Description</FormLabel>
        <Input
          type="string"
          value={description}
          onChange={(event) => setDiscription(event.target.value)}
        />
        <Button onClick={() => createSavingGoal()}>Create Saving Goal</Button>
      </FormControl>
      <Button onClick={() => signOutHandler()}>Sign Out</Button>
    </Box>
  );
};
