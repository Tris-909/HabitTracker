import {
  Icon,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiPlusSquare } from "react-icons/fi";

export const LongStepDescriptionModal = ({
  longDescription,
  shortDescription,
}: {
  longDescription: string;
  shortDescription: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      {shortDescription}
      <Icon as={FiPlusSquare} cursor="pointer" onClick={() => onOpen()} />
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Read the long version of step's description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{longDescription}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
