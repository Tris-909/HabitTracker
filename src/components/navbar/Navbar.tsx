import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Image,
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { LogOutButton } from "../auth/LogOutButton";
import Logo from "./piggy-bank.png";
import { useNavigate } from "react-router-dom";
export const NavBar = () => {
  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  return (
    <Box
      w="100%"
      bg={"#121010"}
      h="11vh"
      mb="2rem"
      display="flex"
      justifyContent={"space-between"}
      alignItems="center"
    >
      <Box color="white" ml="1rem" onClick={() => refreshPage()}>
        <Image src={Logo} w="50px" cursor={"pointer"} />
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
