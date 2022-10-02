import { SharedModal, CreateGoalForm } from "components";
import { Box, useDisclosure, MenuItem } from "@chakra-ui/react";

export const EditGoalModal = ({ goal }: { goal: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <MenuItem onClick={onOpen}>Edit Goal</MenuItem>

      <SharedModal
        isOpen={isOpen}
        onClose={onClose}
        modalForm={
          <CreateGoalForm goal={goal} onClose={onClose} state="Edit" />
        }
        modalTitle="Edit Goal"
      />
    </Box>
  );
};
