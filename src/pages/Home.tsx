import { useEffect } from "react";
import { useAuthState } from "initialization/firebase";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  NavBar,
  CreateGoalModal,
  GoalChart,
  CreateStepModal,
  StepTable,
} from "components";
import { useStore, useGoalStore } from "state";
import { MEDIA_QUERY } from "consts";

export const HomePage = () => {
  const { user: authUser } = useAuthState();
  const user = useStore((state) => state.user);
  const goals = useGoalStore((state) => state.goals);
  const fetchUser = useStore((state) => state.fetchUser);
  const fetchAllGoals = useGoalStore((state) => state.fetchAllGoals);
  const [isDesktop] = useMediaQuery(`(min-width: ${MEDIA_QUERY.DESKTOP})`, {
    ssr: false,
  });

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
    <Box bg="#212121" minHeight={"100vh"}>
      <NavBar />
      <CreateGoalModal />
      <Box
        w="100%"
        mt="2rem"
        display="flex"
        flexDir={isDesktop ? "row" : "column"}
        alignItems={isDesktop ? "initial" : "center"}
        justifyContent={isDesktop ? "space-around" : "initial"}
      >
        <Box bg="white" w={isDesktop ? "40%" : "90%"}>
          {goals && (
            <Tabs>
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
        <Box w={isDesktop ? "50%" : "90%"} mt={isDesktop ? "0rem" : "2rem"}>
          <StepTable />
        </Box>
      </Box>
    </Box>
  );
};
