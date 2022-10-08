import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Highlight,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export const ConfirmDeleteModal = ({
  name,
  onDeleteHandler,
  isOpen,
  onOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box mt="3rem">
            Are you sure you want to{" "}
            <Highlight
              query="delete"
              styles={{ px: "0.5", py: "0.5", bg: "#f5425a" }}
            >
              delete
            </Highlight>{" "}
            this {name} ?
          </Box>
          <Box mt="2rem">
            Once you{" "}
            <Highlight
              query="delete"
              styles={{ px: "0.5", py: "0.5", bg: "#f5425a" }}
            >
              delete
            </Highlight>{" "}
            it, you can't get it back. We don't keep a copy of it anywhere.
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={() => onDeleteHandler()}>Okay</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
