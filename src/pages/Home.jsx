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
  GoalChart,
  StepTable,
  GoalSummary,
  GoalOptions,
  HomeBackground,
  CustomSpinner,
  ShowMileStones,
} from "components";
import {
  useStore,
  useGoalStore,
  useStepStore,
  useMileStonesStore,
} from "state";
import { MEDIA_QUERY } from "consts";

export const HomePage = () => {
  const { user: authUser } = useAuthState();
  const user = useStore((state) => state.user);
  const goals = useGoalStore((state) => state.goals);
  const goalInfo = useStepStore((state) => state.goalInfo);
  const milestones = useMileStonesStore((state) => state.milestones);
  const isLoadingGoal = useGoalStore((state) => state.isLoadingGoal);
  const fetchUser = useStore((state) => state.fetchUser);
  const fetchAllGoals = useGoalStore((state) => state.fetchAllGoals);
  const fetchStepsByGoalId = useStepStore((state) => state.fetchStepsByGoalId);
  const fetchMileStonesByGoalId = useMileStonesStore(
    (state) => state.fetchMileStonesByGoalId
  );
  const [currentDisplayGoal, setCurrentDisplayGoal] = useState(undefined);
  const currentMileStoneRelatedToGoal = milestones[currentDisplayGoal?.id];
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
    if (goals) {
      setCurrentDisplayGoal(goals.length > 0 ? goals[0] : undefined);
    }
  }, [goals]);

  useEffect(() => {
    if (currentDisplayGoal) {
      fetchStepsByGoalId({ goal: currentDisplayGoal });
      fetchMileStonesByGoalId({ goalId: currentDisplayGoal.id });
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
      <Box
        w="100%"
        mt="2rem"
        display="flex"
        flexDir={isDesktop ? "row" : "column"}
        alignItems={isDesktop ? "initial" : "center"}
        justifyContent={isDesktop ? "space-around" : "center"}
      >
        {isLoadingGoal ? (
          <CustomSpinner />
        ) : goals.length > 0 ? (
          <>
            <Box bg="white" w={isDesktop ? "40%" : "90%"} height="fit-content">
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
                  {currentDisplayGoal?.id ? (
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
                          value={goalInfo[currentDisplayGoal.id]?.progress}
                          color="green.400"
                          thickness="5px"
                          mr="1rem"
                          size={isMobile ? "200px" : "150px"}
                        >
                          <CircularProgressLabel>
                            {goalInfo[currentDisplayGoal.id]?.progress}%
                          </CircularProgressLabel>
                        </CircularProgress>
                      </Box>

                      <GoalChart goal={currentDisplayGoal} />

                      <Box>
                        {currentMileStoneRelatedToGoal.length > 0 && (
                          <ShowMileStones goal={currentDisplayGoal} />
                        )}
                      </Box>
                    </>
                  ) : (
                    <Skeleton height="450px" />
                  )}
                </TabPanels>
              </Tabs>
            </Box>
            <Box w={isDesktop ? "50%" : "90%"} mt={isDesktop ? "0rem" : "2rem"}>
              <StepTable goal={currentDisplayGoal} />
            </Box>
          </>
        ) : (
          <HomeBackground />
        )}
      </Box>
    </Box>
  );
};
