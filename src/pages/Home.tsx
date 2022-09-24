import { useEffect } from "react";
import { useAuthState } from "initialization/firebase";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  NavBar,
  CreateGoalModal,
  GoalChart,
  CreateStepModal,
} from "components";
import { useStore, useGoalStore } from "state";

export const HomePage = () => {
  const { user: authUser } = useAuthState();
  const user = useStore((state) => state.user);
  const goals = useGoalStore((state) => state.goals);
  const fetchUser = useStore((state) => state.fetchUser);
  const fetchAllGoals = useGoalStore((state) => state.fetchAllGoals);

  useEffect(() => {
    initializeUser(authUser?.email);
  }, [authUser?.email]);

  useEffect(() => {
    fetchAllGoals({ userId: user?.id });
  }, [user?.id]);

  const initializeUser = async (email: string) => {
    if (email) {
      await fetchUser(email);
    }
  };

  return (
    <Box bg="#212121" h="100vh">
      <NavBar />
      <CreateGoalModal />
      {goals && (
        <Tabs w="40%" bg="white" mt="2rem" ml="2rem">
          <TabList>
            {goals.map((goal: any) => {
              return <Tab key={goal.title}>{goal.title}</Tab>;
            })}
          </TabList>

          <TabPanels>
            {goals.map((goal: any) => {
              return (
                <TabPanel key={goal.id}>
                  <CreateStepModal goal={goal} />
                  <GoalChart goal={goal} />
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
};
