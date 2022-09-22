import React, { useState } from "react";
import { SignInForm, SignUpForm } from "components";
import { Flex } from "@chakra-ui/react";

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
