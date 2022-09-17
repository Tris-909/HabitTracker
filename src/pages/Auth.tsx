import React, { useState } from "react";
import { SignInForm, SignUpForm } from "components";
import { Box, Flex } from "@chakra-ui/react";

export const AuthPage: React.FunctionComponent = () => {
  const [showForm, setShowForm] = useState("signin");

  return (
    <Flex bg="#2c2e2d" height="100vh" width="100%">
      <Box w="50%" h="100%"></Box>
      <Flex w="50%" bg="white" justify={"center"} align="center">
        {showForm === "signin" ? (
          <SignInForm changeFormState={setShowForm} />
        ) : (
          <SignUpForm changeFormState={setShowForm} />
        )}
      </Flex>
    </Flex>
  );
};
