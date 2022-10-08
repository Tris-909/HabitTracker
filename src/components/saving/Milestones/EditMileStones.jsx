import { SharedModal, SharedForm } from "components";
import { useDisclosure, Icon } from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { useMileStonesStore } from "state";

export const EditMileStone = ({
  milestoneId,
  goalId,
  amount,
  description,
  title,
  color,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const milestones = useMileStonesStore((state) => state.milestones);
  const currentMilestones = milestones[goalId];
  const editMileStoneById = useMileStonesStore(
    (state) => state.editMileStoneById
  );

  const actionHandler = ({ amount, description, title, color }) => {
    editMileStoneById({
      milestoneId,
      title,
      amount,
      description,
      goalId,
      color,
    });
  };

  return (
    <>
      <Icon as={FiEdit2} onClick={onOpen} cursor="pointer" mr="1rem" />

      <SharedModal
        isOpen={isOpen}
        onClose={onClose}
        modalForm={
          <SharedForm
            actionHandler={actionHandler}
            onClose={onClose}
            state={"Edit"}
            formName="Milestones"
            existingAmount={amount}
            existingTitle={title}
            existingDescription={description}
            existingColor={color}
            milestones={currentMilestones}
            milestoneId={milestoneId}
          />
        }
        modalTitle="Edit Milestone"
      />
    </>
  );
};
