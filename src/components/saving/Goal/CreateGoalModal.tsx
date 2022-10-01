import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { CreateGoalForm } from "./CreateGoalForm";
import { SharedModal } from "components";
import { useGoalStore } from "state";

export const CreateGoalModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const goals = useGoalStore((state) => state.goals);

  return (
    <Box color="white">
      <Button
        ml="2rem"
        bg="white"
        color="black"
        isDisabled={goals.length === 5}
        onClick={onOpen}
      >
        Create Saving Goal
      </Button>

      <SharedModal
        isOpen={isOpen}
        onClose={onClose}
        modalForm={<CreateGoalForm onClose={onClose} />}
        modalTitle="Create Saving Goal"
      />
    </Box>
  );
};
