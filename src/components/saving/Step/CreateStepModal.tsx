import { SharedModal } from "components";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { CreateStepForm } from "./CreateStepForm";

export const CreateStepModal = ({ goal }: { goal: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box color="white">
      <Button
        ml="2rem"
        mb="1rem"
        bg="#5D5D5D"
        color="white"
        _hover={{ bg: "#5D5D5D" }}
        onClick={onOpen}
      >
        Add Step
      </Button>

      <SharedModal
        isOpen={isOpen}
        onClose={onClose}
        modalForm={<CreateStepForm goal={goal} onClose={onClose} />}
        modalTitle="Adding One Step"
      />
    </Box>
  );
};
