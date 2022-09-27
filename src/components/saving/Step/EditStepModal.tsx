import { SharedModal } from "components";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { EditStepForm } from "./EditStepForm";

export const EditStepModal = ({ step }: { step: any }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box>
      <Button onClick={onOpen} rightIcon={<FiEdit2 />}>
        Edit
      </Button>
      <SharedModal
        isOpen={isOpen}
        onClose={onClose}
        modalForm={<EditStepForm step={step} onClose={onClose} />}
        modalTitle="Edit Step"
      />
    </Box>
  );
};
