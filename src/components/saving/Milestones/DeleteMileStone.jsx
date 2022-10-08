import { Icon, useDisclosure } from "@chakra-ui/react";
import { ConfirmDeleteModal } from "components";
import { FiX } from "react-icons/fi";
import { useMileStonesStore } from "state";

export const DeleteMilestoneModal = ({ milestone, goal }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const deleteMileStoneById = useMileStonesStore(
    (state) => state.deleteMileStoneById
  );

  const deleteMileStoneHandler = (milestoneId) => {
    deleteMileStoneById({
      goalId: goal.id,
      milestoneId: milestoneId,
    });
    onClose();
  };

  return (
    <>
      <Icon as={FiX} cursor="pointer" onClick={() => onOpen()} />
      <ConfirmDeleteModal
        name="milestone"
        onDeleteHandler={() => deleteMileStoneHandler(milestone.id)}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};
