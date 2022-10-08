import { SharedModal, SharedForm } from "components";
import { Box, useDisclosure, MenuItem } from "@chakra-ui/react";
import { useStore, useMileStonesStore } from "state";

export const CreateMileStoneModal = ({ goal }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useStore((state) => state.user);
  const createMileStone = useMileStonesStore((state) => state.createMileStone);

  const actionHandler = ({ amount, description, title, color }) => {
    createMileStone({
      user,
      title,
      amount,
      color,
      description,
      goalId: goal.id,
    });
  };

  return (
    <Box>
      <MenuItem onClick={onOpen}>Add MileStone</MenuItem>

      <SharedModal
        isOpen={isOpen}
        onClose={onClose}
        modalForm={
          <SharedForm
            actionHandler={actionHandler}
            onClose={onClose}
            state={"Create"}
            formName="Milestones"
          />
        }
        modalTitle="Adding MileStone"
      />
    </Box>
  );
};
