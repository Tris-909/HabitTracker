import { useEffect, useState } from "react";
import { db, useAuthState } from "initialization/firebase";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import {
  NavBar,
  CreateGoalModal,
  GoalChart,
  CreateStepModal,
} from "components";
import { SavingGoal } from "types";
import { useStore } from "state";

export const HomePage = () => {
  const { user: authUser } = useAuthState();
  const [savingGoals, setSavingGoals] = useState<SavingGoal[]>([]);
  const { user } = useStore((state) => state.firestore);
  const fetchUser = useStore((state) => state.fetchUser);

  useEffect(() => {
    initializeUser(authUser?.email);
  }, [authUser?.email]);

  useEffect(() => {
    querySavingGoals();
  }, [user.id]);

  const initializeUser = async (email: string) => {
    if (email) {
      await fetchUser(email);

      if (!user) {
        addDoc(collection(db, "users"), {
          email: email,
          createdAt: serverTimestamp(),
        });
      }
    }
  };

  const querySavingGoals = async () => {
    if (user.id) {
      const queries = query(
        collection(db, "goals"),
        where("parentId", "==", user.id)
      );
      const { docs } = await getDocs(queries);
      const currentSavingGoals = docs.map((doc) => {
        const goal = {
          id: doc.id,
          ...doc.data(),
        } as SavingGoal;

        return goal;
      });
      setSavingGoals(currentSavingGoals);
      console.log("currentSavingGoals", currentSavingGoals);
    }
  };

  return (
    <Box bg="#212121" h="100vh">
      <NavBar />
      <CreateGoalModal userFb={user} />
      <Tabs w="40%" bg="white" mt="2rem" ml="2rem">
        <TabList>
          {savingGoals.map((goal) => {
            return <Tab>{goal.title}</Tab>;
          })}
        </TabList>

        <TabPanels>
          {savingGoals.map((goal) => {
            return (
              <TabPanel>
                <CreateStepModal userFb={user} goal={goal} />
                <GoalChart goal={goal} />
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Box>
  );
};
