import { useState } from "react";
import { firebase } from "initialization/firebase";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Heading,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export const SignUpForm = ({
  changeFormState,
}: {
  changeFormState: (formState: string) => void;
}) => {
  const auth = getAuth(firebase);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUpHandler = () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          sendEmailVerification(user);
          // supposed to have a toast to inform this
          setError("Please verify the user's email before login");
        })
        .catch((error) => {
          if (error.message.includes("email-already-in-use")) {
            setError("Email is already in use");
          }
        });
    } else {
      if (!email && !password) {
        setError("Email and Password are required");
      } else if (!password) {
        setError("Password is required");
      } else {
        setError("Email is required");
      }
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      direction={"column"}
      p="1rem"
      height="100%"
    >
      <Heading size="3xl" mb="3rem">
        Sign Up.
      </Heading>
      <FormControl isInvalid={error ? true : false}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <FormLabel mt="1rem">Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        <Box mt="1.5rem">
          <Button
            onClick={() => signUpHandler()}
            bg="#2c2e2d"
            color="white"
            _hover={{
              bg: "#2c2e2d",
              color: "white",
            }}
          >
            Sign Up
          </Button>
          <Button
            onClick={() => changeFormState("signin")}
            ml="1rem"
            bg="#2c2e2d"
            color="white"
            _hover={{
              bg: "#2c2e2d",
              color: "white",
            }}
          >
            Already have an account ?
          </Button>
        </Box>
      </FormControl>
    </Flex>
  );
};
