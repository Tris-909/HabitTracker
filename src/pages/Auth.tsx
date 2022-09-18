import React, { useState } from "react";
import { SignInForm, SignUpForm, LeftScreenImage } from "components";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { MEDIA_QUERY } from "consts";

export const AuthPage: React.FunctionComponent = () => {
  const [showForm, setShowForm] = useState("signin");
  const [isDesktop] = useMediaQuery(`(min-width: ${MEDIA_QUERY.DESKTOP})`);

  return (
    <Flex bg="#2c2e2d" height="100vh" width="100%">
      {isDesktop && <LeftScreenImage />}
      <Flex
        w={isDesktop ? "50%" : "100%"}
        bg="white"
        justify={"center"}
        align="center"
        position={"relative"}
      >
        {showForm === "signin" ? (
          <SignInForm changeFormState={setShowForm} />
        ) : (
          <SignUpForm changeFormState={setShowForm} />
        )}
      </Flex>
    </Flex>
  );
};
