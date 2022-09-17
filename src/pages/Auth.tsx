import React, { useState } from "react";
import { SignInForm, SignUpForm } from "components";
import { Box, Flex, Image } from "@chakra-ui/react";
import sleepImage from "assets/sleep.png";
import badHabitsImage from "assets/bad-habits.png";
import bookImage from "assets/book.png";
import piggyBankImage from "assets/piggy-bank.png";
import healthLifeImage from "assets/healthy-life.png";

export const AuthPage: React.FunctionComponent = () => {
  const [showForm, setShowForm] = useState("signin");

  return (
    <Flex bg="#2c2e2d" height="100vh" width="100%">
      <Box w="50%" h="100%">
        <Box w="100%" h="100%" position="relative">
          <Image
            src={sleepImage}
            w="15%"
            h="15%"
            position="absolute"
            top="32%"
            left="15%"
          />
          <Image
            src={badHabitsImage}
            w="15%"
            h="15%"
            position="absolute"
            top="23%"
            left="42%"
          />
          <Image
            src={bookImage}
            w="15%"
            h="15%"
            position="absolute"
            top="32%"
            left="70%"
          />
          <Box
            color="white"
            left="35%"
            top="45%"
            position="absolute"
            fontSize={"1.5rem"}
          >
            <Box> Track your habit, </Box>
            <Box> Change your life. </Box>
          </Box>
          <Image
            src={piggyBankImage}
            w="15%"
            h="15%"
            position="absolute"
            top="60%"
            left="60%"
          />
          <Image
            src={healthLifeImage}
            w="15%"
            h="15%"
            position="absolute"
            top="60%"
            left="25%"
          />
        </Box>
      </Box>
      <Flex
        w="50%"
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
