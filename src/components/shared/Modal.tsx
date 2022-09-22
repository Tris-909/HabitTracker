import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";

interface SharedModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  ModalForm: any; // Component
}

export const SharedModal = ({
  isOpen,
  onClose,
  modalTitle,
  ModalForm,
}: SharedModalProps) => {
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalForm />
        </ModalContent>
      </Modal>
    </Box>
  );
};
