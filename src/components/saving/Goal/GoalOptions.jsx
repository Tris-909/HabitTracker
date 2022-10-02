import { FiChevronDown } from "react-icons/fi";
import { Menu, MenuButton, MenuList, IconButton } from "@chakra-ui/react";
import { CreateStepModal, EditGoalModal } from "components";

export const GoalOptions = ({ goal }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FiChevronDown />}
        color="black"
        bg="white"
        _hover={{
          bg: "white",
          color: "black",
        }}
        _active={{
          bg: "white",
          color: "black",
        }}
        fontSize="30px"
      />
      <MenuList>
        <EditGoalModal goal={goal} />
        <CreateStepModal goal={goal} />
      </MenuList>
    </Menu>
  );
};
