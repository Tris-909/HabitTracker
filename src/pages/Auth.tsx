import React, { useState } from "react";
import { SignInForm, SignUpForm } from "components";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { MEDIA_QUERY } from "consts";
import { colors } from "consts";

export const AuthPage: React.FunctionComponent = () => {
  const [showForm, setShowForm] = useState("signin");

  return (
    <Flex
      bg={"white"}
      height="100vh"
      width="100%"
      justify="center"
      alignItems="center"
    >
      <Flex>
        {showForm === "signin" ? (
          <SignInForm changeFormState={setShowForm} />
        ) : (
          <SignUpForm changeFormState={setShowForm} />
        )}
      </Flex>
    </Flex>
  );
};
