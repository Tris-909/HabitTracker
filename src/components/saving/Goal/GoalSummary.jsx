import { Box, Heading, Highlight, useMediaQuery } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useStepStore } from "state";
import { MEDIA_QUERY } from "consts";
import { formatNumber } from "utils";

export const GoalSummary = ({ goal }) => {
  const goalInfo = useStepStore((state) => state.goalInfo);
  const [isMobile] = useMediaQuery(`(max-width: ${MEDIA_QUERY.MOBILE})`, {
    ssr: false,
  });

  return (
    <Box
      color="black"
      borderRadius={"6px"}
      border="2px solid #d9d5d2"
      p="1rem"
      ml="1rem"
      mr={isMobile ? "1rem" : "0rem"}
      w={isMobile ? "90%" : "initial"}
    >
      <Heading as="h4" size="sm" mb="1rem">
        <Highlight
          query="Goal:"
          styles={{ px: "2", py: "1", rounded: "full", bg: "#f5fa0a" }}
        >
          Goal:
        </Highlight>
        {` `} {formatNumber(goal?.goal.toString())}{" "}
        {goal?.currency ? goal.currency : null}
      </Heading>
      <Heading as="h4" size="sm" mb="1rem">
        <Highlight
          query="Current:"
          styles={{ px: "2", py: "1", rounded: "full", bg: "#0afa76" }}
        >
          Current:
        </Highlight>
        {` `} {formatNumber(goalInfo[goal.id]?.total.toString())}{" "}
        {goal?.currency ? goal.currency : null}
      </Heading>
      <Heading as="h4" size="sm" mb="1rem">
        <Highlight
          query="Loss:"
          styles={{ px: "2", py: "1", rounded: "full", bg: "#f70c30" }}
        >
          Loss:
        </Highlight>
        {` `}
        {goalInfo[goal.id]?.loss}
      </Heading>
      <Heading as="h4" size="sm">
        <Highlight
          query="Started from:"
          styles={{ px: "2", py: "1", rounded: "full", bg: "#cca583" }}
        >
          Started from:
        </Highlight>
        {` `}
        {dayjs(dayjs.unix(goal?.createdAt.seconds)).format("DD/MM/YYYY")}
      </Heading>
    </Box>
  );
};
