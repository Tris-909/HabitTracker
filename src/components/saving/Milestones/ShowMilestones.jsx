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
import { useMileStonesStore, useStepStore } from "state";
import { FiEdit2, FiX } from "react-icons/fi";

export const ShowMileStones = ({ goal }) => {
  const milestones = useMileStonesStore((state) => state.milestones);
  const goalInfo = useStepStore((state) => state.goalInfo);

  const showBadgesBasedOnAmount = ({ milestone }) => {
    const { total } = goalInfo[goal.id];
    const decideFactor = (milestone.amount * 1) / total;
    const progress =
      Math.round(((milestone.amount * 1) / total) * 100 * 10) / 10;

    if (total === 0) {
      return <Badge colorScheme="red">0%</Badge>;
    } else if (decideFactor <= 0.5) {
      return <Badge colorScheme="red">{progress}</Badge>;
    } else if (decideFactor > 0.5 && decideFactor < 0.8) {
      return <Badge colorScheme="yellow">{progress}</Badge>;
    } else {
      return <Badge colorScheme="green">{progress}</Badge>;
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
          {milestones &&
            milestones[goal.id].map((milestone, index) => (
              <Box display={"flex"} flexDir="column">
                <Box
                  display={"flex"}
                  mt="1rem"
                  mb="1rem"
                  justifyContent={"space-between"}
                >
                  <Box>
                    <Heading as="h6" size="xs">
                      {milestone.title}
                    </Heading>
                    <Tooltip label={milestone.amount}>
                      {showBadgesBasedOnAmount({ milestone: milestone })}
                    </Tooltip>
                  </Box>
                  <Box>
                    <Icon as={FiEdit2} cursor="pointer" /> /{" "}
                    <Icon as={FiX} cursor="pointer" />
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
