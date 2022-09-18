import { Box, Button, useMediaQuery } from "@chakra-ui/react";
import { MEDIA_QUERY } from "consts";

type GroupButtonsProps = {
  actionHandler: () => void;
  actionText: string;
  changeFormHandler: () => void;
  changeFormText: string;
};

export const GroupButtons = ({
  actionHandler,
  actionText,
  changeFormHandler,
  changeFormText,
}: GroupButtonsProps) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MEDIA_QUERY.MOBILE})`);

  return (
    <Box mt="1.5rem" display={"flex"} flexDir={isMobile ? "column" : "row"}>
      <Button
        onClick={() => actionHandler()}
        bg="#2c2e2d"
        color="white"
        mb={isMobile ? "1rem" : "0rem"}
        _hover={{
          bg: "#2c2e2d",
          color: "white",
        }}
      >
        {actionText}
      </Button>
      <Button
        onClick={() => changeFormHandler()}
        ml={isMobile ? "0rem" : "1rem"}
        bg="#2c2e2d"
        color="white"
        _hover={{
          bg: "#2c2e2d",
          color: "white",
        }}
      >
        {changeFormText}
      </Button>
    </Box>
  );
};
