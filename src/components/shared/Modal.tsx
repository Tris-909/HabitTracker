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
  modalForm: any; // Component
}

export const SharedModal = ({
  isOpen,
  onClose,
  modalTitle,
  modalForm,
}: SharedModalProps) => {
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          {modalForm}
        </ModalContent>
      </Modal>
    </Box>
  );
};
