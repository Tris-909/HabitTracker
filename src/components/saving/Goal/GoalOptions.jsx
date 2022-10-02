import { FiChevronDown } from "react-icons/fi";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { CreateStepModal } from "components";

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
        <MenuItem>Edit Goal</MenuItem>
        <CreateStepModal goal={goal} />
      </MenuList>
    </Menu>
  );
};
