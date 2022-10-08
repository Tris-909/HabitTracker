import { Menu, MenuButton, MenuList, IconButton } from "@chakra-ui/react";
import {
  CreateStepModal,
  EditGoalModal,
  DeleteGoal,
  CreateGoalModal,
  CreateMileStoneModal,
} from "components";
import { FiSettings } from "react-icons/fi";

export const GoalOptions = ({ goal }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FiSettings />}
        color="black"
        bg="white"
        transition="transform 1s ease-in-out"
        _hover={{
          bg: "white",
          color: "black",
          transform: "rotate(180deg)",
        }}
        _active={{
          bg: "white",
          color: "black",
        }}
        fontSize="25px"
      />
      <MenuList>
        <CreateGoalModal state="AlreadyHasGoal" />
        <EditGoalModal goal={goal} />
        <DeleteGoal goalId={goal.id} />
        <CreateStepModal goal={goal} />
        <CreateMileStoneModal goal={goal} />
      </MenuList>
    </Menu>
  );
};
