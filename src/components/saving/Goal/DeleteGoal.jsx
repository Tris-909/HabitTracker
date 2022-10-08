import { Box, useDisclosure, MenuItem } from "@chakra-ui/react";
import { ConfirmDeleteModal } from "components/shared";
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

      <ConfirmDeleteModal
        name="goal"
        onDeleteHandler={onDeleteHandler}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};
