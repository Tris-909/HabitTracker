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
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Show error message
// Show validation message ( valite existence validate email )
// Should not allow user to login without email verified
// Empty Email or Password should throw different error

export const SignInForm = () => {
  const auth = getAuth(firebase);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          navigate("/");
        } else {
          //   setMessage("User's email need to be verified before login in");
        }
      })
      .catch((error) => {
        console.log("error", error);
        console.log("error", error.message);
      });
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
        Login
      </Heading>
      <FormControl isInvalid={true}>
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
        <FormErrorMessage>Email and Password is required</FormErrorMessage>
        <FormErrorMessage>Email or password is not correct</FormErrorMessage>
        <FormErrorMessage>
          Email must be verified before login in
        </FormErrorMessage>
        <Box mt="1.5rem">
          <Button
            onClick={() => signInHandler()}
            bg="#2c2e2d"
            color="white"
            _hover={{
              bg: "#2c2e2d",
              color: "white",
            }}
          >
            Sign In
          </Button>
          <Button
            onClick={() => signInHandler()}
            ml="1rem"
            bg="#2c2e2d"
            color="white"
            _hover={{
              bg: "#2c2e2d",
              color: "white",
            }}
          >
            Create An Account
          </Button>
        </Box>
      </FormControl>
    </Flex>
  );
};
