import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CreateGoalForm } from "./CreateGoalForm";

export const CreateGoalModal = (userFb: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box color="white">
      <Button ml="2rem" bg="white" color="black" onClick={onOpen}>
        Create Saving Goal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Saving Goal</ModalHeader>
          <ModalCloseButton />
          <CreateGoalForm userFb={userFb} onClose={onClose} />
        </ModalContent>
      </Modal>
    </Box>
  );
};
