import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebase } from "initialization/firebase";
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Box,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const AuthPage: React.FunctionComponent = () => {
  const auth = getAuth(firebase);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const signUpHandler = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log("userCredentials", userCredentials);
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  return (
    <Box>
      <Heading>Sign In</Heading>
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
        <Button onClick={() => signInHandler()}> Sign In </Button>
      </FormControl>

      <Heading>Sign Up</Heading>
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
        <Button onClick={() => signUpHandler()}> Sign Up </Button>
      </FormControl>
    </Box>
  );
};
