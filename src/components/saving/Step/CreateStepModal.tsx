import { SharedModal } from "components";
import { Box, useDisclosure, MenuItem } from "@chakra-ui/react";
import { CreateStepForm } from "./CreateStepForm";

export const CreateStepModal = ({ goal }: { goal: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <MenuItem onClick={onOpen}>Add Step</MenuItem>

      <SharedModal
        isOpen={isOpen}
        onClose={onClose}
        modalForm={
          <CreateStepForm goal={goal} onClose={onClose} isCreate={true} />
        }
        modalTitle="Adding One Step"
      />
    </Box>
  );
};
