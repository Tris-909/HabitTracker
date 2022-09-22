import { Box, IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { LogOutButton } from "../auth/LogOutButton";

export const NavBar = () => {
  return (
    <Box
      w="100%"
      bg={"#484848"}
      h="10vh"
      mb="3red"
      display="flex"
      justifyContent={"space-between"}
      alignItems="center"
      position={"fixed"}
      top="0px"
    >
      <Box color="white" ml="2rem">
        Habit Tracker
      </Box>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FiSettings />}
          color="black"
          mr="1rem"
        />
        <MenuList>
          <LogOutButton />
        </MenuList>
      </Menu>
    </Box>
  );
};
