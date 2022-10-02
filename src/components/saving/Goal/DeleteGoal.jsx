import {
  Box,
  Button,
  useDisclosure,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  Highlight,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useStepStore, useGoalStore } from "state";

export const DeleteGoal = ({ goalId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const steps = useStepStore((state) => state.steps);
  const deleteGoal = useGoalStore((state) => state.deleteGoal);

  const onDeleteHandler = () => {
    onClose();
    deleteGoal({
      goalId: goalId,
      steps: steps[goalId],
    });
  };

  return (
    <Box>
      <MenuItem onClick={onOpen}>Delete Goal</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box mt="3rem">
              <Highlight
                query="delete"
                styles={{ px: "0.5", py: "0.5", bg: "#f5425a" }}
              >
                Are you sure you want to delete this goal along with all related
                steps ?
              </Highlight>
            </Box>
            <Box mt="2rem">
              <Highlight
                query="delete"
                styles={{ px: "0.5", py: "0.5", bg: "#f5425a" }}
              >
                Once you delete it, you can't get it back. We don't keep a copy
                of it anywhere.
              </Highlight>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => onDeleteHandler()}>Okay</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
