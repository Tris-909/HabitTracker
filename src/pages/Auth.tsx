import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { firebase } from "initialization/firebase";
import { SignInForm } from "components/auth/SignInForm";
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const AuthPage: React.FunctionComponent = () => {
  const auth = getAuth(firebase);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const signInHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          navigate("/");
        } else {
          setMessage("User's email need to be verified before login in");
        }
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const signUpHandler = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        sendEmailVerification(userCredentials.user);
        setMessage("Please verify the user's email before login");
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  return (
    <Flex bg="#2c2e2d" height="100vh" width="100%">
      <Box w="50%" h="100%"></Box>
      <Flex w="50%" bg="white" justify={"center"} align="center">
        <SignInForm />
      </Flex>
      {/* 
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Box>{message}</Box>
        <Button onClick={() => signUpHandler()}> Sign Up </Button>
      </FormControl> */}
    </Flex>
  );
};
