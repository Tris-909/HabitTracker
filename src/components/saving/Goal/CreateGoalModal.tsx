import { Box, Text, MenuItem, useDisclosure } from "@chakra-ui/react";
import { CreateGoalForm } from "./CreateGoalForm";
import { SharedModal } from "components";
import { useGoalStore } from "state";

export const CreateGoalModal = ({ state }: { state: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const goals = useGoalStore((state) => state.goals);

  return (
    <Box color="white">
      {state === "NoGoal" ? (
        <Text
          ml="0.7rem"
          cursor={"pointer"}
          textDecoration="underline"
          onClick={onOpen}
        >
          Now
        </Text>
      ) : (
        <MenuItem
          onClick={onOpen}
          color="black"
          isDisabled={goals.length === 5}
        >
          Create Another Goal
        </MenuItem>
      )}

      <SharedModal
        isOpen={isOpen}
        onClose={onClose}
        modalForm={<CreateGoalForm onClose={onClose} state="Create" />}
        modalTitle="Create Saving Goal"
      />
    </Box>
  );
};
