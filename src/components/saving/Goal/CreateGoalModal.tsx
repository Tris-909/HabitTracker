import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export const CreateGoalModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box color="white">
      <Button ml="2rem" bg="white" color="black" onClick={onOpen}>
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Saving Goal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>123</ModalBody>

          <ModalFooter>
            <Button
              bg="black"
              color="white"
              _hover={{
                bg: "#484848",
              }}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              bg="black"
              color="white"
              _hover={{
                bg: "#484848",
              }}
            >
              Secondary Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
