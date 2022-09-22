import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { CreateGoalForm } from "./CreateGoalForm";
import { SharedModal } from "components";

export const CreateGoalModal = (userFb: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box color="white">
      <Button ml="2rem" bg="white" color="black" onClick={onOpen}>
        Create Saving Goal
      </Button>

      <SharedModal
        isOpen={isOpen}
        onClose={onClose}
        modalForm={<CreateGoalForm userFb={userFb} onClose={onClose} />}
        modalTitle="Create Saving Goal"
      />
    </Box>
  );
};
