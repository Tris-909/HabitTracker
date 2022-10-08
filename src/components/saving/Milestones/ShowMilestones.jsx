import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Divider,
  Heading,
  Badge,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { EditMileStone, DeleteMilestoneModal } from "components";
import { useMileStonesStore, useStepStore } from "state";
import { FiCheck } from "react-icons/fi";

export const ShowMileStones = ({ goal }) => {
  const milestones = useMileStonesStore((state) => state.milestones);
  const goalInfo = useStepStore((state) => state.goalInfo);

  const showBadgesBasedOnAmount = ({ milestone }) => {
    const { total } = goalInfo[goal.id];
    const decideFactor = total / (milestone.amount * 1);
    const progress =
      Math.round((total / (milestone.amount * 1)) * 100 * 10) / 10;

    if (total === 0) {
      return <Badge colorScheme="red">0%</Badge>;
    } else if (decideFactor <= 0.5) {
      return <Badge colorScheme="red">{progress}%</Badge>;
    } else if (decideFactor > 0.5 && decideFactor < 0.8) {
      return <Badge colorScheme="yellow">{progress}%</Badge>;
    } else {
      return <Badge colorScheme="green">{progress}%</Badge>;
    }
  };

  const showCrossOver = ({ milestone }) => {
    const { total } = goalInfo[goal.id];
    const progress =
      Math.round((total / (milestone.amount * 1)) * 100 * 10) / 10;

    if (progress >= 100) {
      return "line-through";
    } else {
      return "inherit";
    }
  };

  const showIcon = ({ milestone }) => {
    const { total } = goalInfo[goal.id];
    const progress =
      Math.round((total / (milestone.amount * 1)) * 100 * 10) / 10;

    if (progress >= 100) {
      return (
        <Icon
          as={FiCheck}
          width="1.25rem"
          height="1.25rem"
          ml="1rem"
          color="green"
        />
      );
    } else {
      return null;
    }
  };

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Heading as="h5" flex="1" textAlign="left">
              MileStones
            </Heading>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {goal.id in milestones &&
            milestones[goal.id].map((milestone, index) => (
              <Box display={"flex"} flexDir="column" key={milestone.id}>
                <Box
                  display={"flex"}
                  mt="1rem"
                  mb="1rem"
                  justifyContent={"space-between"}
                >
                  <Box>
                    <Heading
                      as="h6"
                      size="md"
                      textDecoration={() =>
                        showCrossOver({ milestone: milestone })
                      }
                    >
                      {milestone.title}
                      {showIcon({ milestone: milestone })}
                    </Heading>
                    <Tooltip label={milestone.amount}>
                      {showBadgesBasedOnAmount({ milestone: milestone })}
                    </Tooltip>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent="center"
                    alignContent={"center"}
                  >
                    <EditMileStone
                      milestoneId={milestone.id}
                      goalId={goal.id}
                      amount={milestone.amount}
                      description={milestone.description}
                      title={milestone.title}
                      color={milestone.color}
                    />
                    <DeleteMilestoneModal milestone={milestone} goal={goal} />
                  </Box>
                </Box>

                <Box>{milestone.description}</Box>
                {index !== milestones[goal.id].length - 1 && (
                  <Divider mt="1rem" />
                )}
              </Box>
            ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
