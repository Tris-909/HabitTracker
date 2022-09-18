import { Box, Button, useMediaQuery } from "@chakra-ui/react";
import { MEDIA_QUERY } from "consts";
import { colors } from "consts";

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
        bg={`${colors.black}`}
        color="white"
        mb={isMobile ? "1rem" : "0rem"}
        _hover={{
          bg: `${colors.black}`,
          color: "white",
        }}
      >
        {actionText}
      </Button>
      <Button
        onClick={() => changeFormHandler()}
        ml={isMobile ? "0rem" : "1rem"}
        bg={`${colors.black}`}
        color="white"
        _hover={{
          bg: `${colors.black}`,
          color: "white",
        }}
      >
        {changeFormText}
      </Button>
    </Box>
  );
};
