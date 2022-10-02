import Background from "assets/homeBackground.png";
import { Box, Image } from "@chakra-ui/react";
import { CreateGoalModal } from "components";

export const HomeBackground = () => {
  return (
    <Box
      w="100%"
      flexDir={"column"}
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
    >
      <Image src={Background} w="300px" h="300px" />
      <Box display={"flex"} color="white" mt="2rem" mb="2rem" fontSize="2xl">
        Start Your Journey <CreateGoalModal state="NoGoal" />
      </Box>
    </Box>
  );
};
