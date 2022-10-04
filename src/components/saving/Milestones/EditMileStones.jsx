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
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editMileStoneById = useMileStonesStore(
    (state) => state.editMileStoneById
  );

  const actionHandler = ({ amount, description, title }) => {
    editMileStoneById({
      milestoneId,
      title,
      amount,
      description,
      goalId,
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
            existingAmount={amount}
            existingTitle={title}
            existingDescription={description}
          />
        }
        modalTitle="Edit Goal"
      />
    </>
  );
};
