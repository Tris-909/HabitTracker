import { Button } from "@chakra-ui/react";

export const SharedButton = ({ onClickHandler, displayText, icon }) => {
  return (
    <Button
      bg="black"
      color="white"
      leftIcon={icon}
      _hover={{
        bg: "#484848",
      }}
      onClick={() => {
        onClickHandler();
      }}
    >
      {displayText}
    </Button>
  );
};
