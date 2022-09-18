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
  useMediaQuery,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { MEDIA_QUERY } from "consts";

export const SignInForm = ({
  changeFormState,
}: {
  changeFormState: (formState: string) => void;
}) => {
  const auth = getAuth(firebase);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDesktop] = useMediaQuery(`(min-width: ${MEDIA_QUERY.DESKTOP})`);
  const [isMobile] = useMediaQuery(`(max-width: ${MEDIA_QUERY.MOBILE})`);

  const signInHandler = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.emailVerified) {
            navigate("/");
          } else {
            setError("User's email need to be verified before login in");
          }
        })
        .catch((error) => {
          if (error.message.includes("wrong-password")) {
            setError("Email or Password is not correct");
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
      {!isDesktop && (
        <Heading size="4xl" mb="5rem">
          Habit Tracker
        </Heading>
      )}
      <Heading size="3xl" mb="2rem">
        Login.
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
        <Box mt="1.5rem" display={"flex"} flexDir={isMobile ? "column" : "row"}>
          <Button
            onClick={() => signInHandler()}
            bg="#2c2e2d"
            color="white"
            mb={isMobile ? "1rem" : "0rem"}
            _hover={{
              bg: "#2c2e2d",
              color: "white",
            }}
          >
            Sign In
          </Button>
          <Button
            onClick={() => changeFormState("signup")}
            ml={isMobile ? "0rem" : "1rem"}
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
