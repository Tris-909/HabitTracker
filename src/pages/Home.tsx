import { useEffect, useState } from "react";
import { db, useAuthState } from "initialization/firebase";
import { Box } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { NavBar, CreateGoalModal } from "components";

export const HomePage = () => {
  const { user } = useAuthState();
  const [userFb, setUserFb] = useState<DocumentData>({});

  useEffect(() => {
    initializeUser(user?.email);
  }, [user?.email]);

  // useEffect(() => {
  //   querySavingGoals();
  // }, [userFb.id]);

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

  // const querySavingGoals = async () => {
  //   if (userFb.id) {
  //     const queries = query(
  //       collection(db, "goals"),
  //       where("parentId", "==", userFb.id)
  //     );
  //     const { docs } = await getDocs(queries);
  //     const currentSavingGoals = docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //     });
  //     console.log("currentSavingGoals", currentSavingGoals);
  //   }
  // };

  return (
    <Box bg="#212121" h="100vh">
      <NavBar />
      <CreateGoalModal userFb={userFb} />
    </Box>
  );
};
