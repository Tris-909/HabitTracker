import { Box, IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { LogOutButton } from "../auth/LogOutButton";

export const NavBar = () => {
  return (
    <Box
      w="100%"
      bg={"#121010"}
      h="10vh"
      mb="2rem"
      display="flex"
      justifyContent={"space-between"}
      alignItems="center"
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
