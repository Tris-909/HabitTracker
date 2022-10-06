import { SharedModal } from "components";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { CreateStepForm } from "./CreateStepForm";

export const EditStepModal = ({ step, goal }: { step: any; goal: any }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box>
      <Button onClick={onOpen} rightIcon={<FiEdit2 />}>
        Edit
      </Button>
      <SharedModal
        isOpen={isOpen}
        onClose={onClose}
        modalForm={
          <CreateStepForm
            step={step}
            goal={goal}
            isCreate={false}
            onClose={onClose}
          />
        }
        modalTitle="Edit Step"
      />
    </Box>
  );
};
