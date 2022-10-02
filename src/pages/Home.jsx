import { useState, useEffect } from "react";
import { useAuthState } from "initialization/firebase";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  useMediaQuery,
  CircularProgress,
  CircularProgressLabel,
  Skeleton,
  Heading,
} from "@chakra-ui/react";
import {
  NavBar,
  CreateGoalModal,
  GoalChart,
  CreateStepModal,
  StepTable,
  GoalSummary,
  GoalOptions,
} from "components";
import { useStore, useGoalStore, useStepStore } from "state";
import { MEDIA_QUERY } from "consts";

export const HomePage = () => {
  const { user: authUser } = useAuthState();
  const [progress, setProgress] = useState(0);
  const [currentDisplayGoal, setCurrentDisplayGoal] = useState(undefined);
  const user = useStore((state) => state.user);
  const goals = useGoalStore((state) => state.goals);
  const fetchUser = useStore((state) => state.fetchUser);
  const fetchAllGoals = useGoalStore((state) => state.fetchAllGoals);
  const fetchStepsByGoalId = useStepStore((state) => state.fetchStepsByGoalId);
  const [isDesktop] = useMediaQuery(`(min-width: ${MEDIA_QUERY.DESKTOP})`, {
    ssr: false,
  });
  const [isMobile] = useMediaQuery(`(max-width: ${MEDIA_QUERY.MOBILE})`, {
    ssr: false,
  });

  useEffect(() => {
    initializeUser(authUser?.email);
  }, [authUser?.email]);

  useEffect(() => {
    if (user?.id) {
      fetchAllGoals({ userId: user.id });
    }
  }, [fetchAllGoals, user?.id]);

  useEffect(() => {
    setCurrentDisplayGoal(goals.length ? goals[0] : undefined);
  }, [goals]);

  useEffect(() => {
    if (currentDisplayGoal) {
      fetchStepsByGoalId({ goalId: currentDisplayGoal?.id });
    }
  }, [currentDisplayGoal?.id]);

  const initializeUser = async (email) => {
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
        <Box bg="white" w={isDesktop ? "40%" : "90%"} height="fit-content">
          {goals && (
            <Tabs>
              <TabList>
                {goals.map((goal) => {
                  return (
                    <Tab
                      key={goal.title}
                      onClick={() => setCurrentDisplayGoal(goal)}
                    >
                      {goal.title}
                    </Tab>
                  );
                })}
              </TabList>

              <TabPanels>
                {currentDisplayGoal ? (
                  <>
                    <Box
                      display={"flex"}
                      justifyContent="space-between"
                      mt="0.5rem"
                      mr="0.5rem"
                    >
                      <Heading as="h5" ml="1rem">
                        {currentDisplayGoal.description}
                      </Heading>
                      <GoalOptions goal={currentDisplayGoal} />
                    </Box>
                    <Box
                      display="flex"
                      flexDir={isMobile ? "column" : "row"}
                      justifyContent={"space-between"}
                      alignItems="center"
                      mt="1rem"
                      mb="1rem"
                    >
                      <GoalSummary goal={currentDisplayGoal} />
                      <CircularProgress
                        value={progress}
                        color="green.400"
                        thickness="5px"
                        mr="1rem"
                        size={isMobile ? "200px" : "150px"}
                      >
                        <CircularProgressLabel>
                          {progress}%
                        </CircularProgressLabel>
                      </CircularProgress>
                    </Box>

                    <GoalChart
                      goal={currentDisplayGoal}
                      setProgress={setProgress}
                    />
                  </>
                ) : (
                  <Skeleton height="450px" />
                )}
              </TabPanels>
            </Tabs>
          )}
        </Box>
        <Box w={isDesktop ? "50%" : "90%"} mt={isDesktop ? "0rem" : "2rem"}>
          <StepTable goal={currentDisplayGoal} />
        </Box>
      </Box>
    </Box>
  );
};
