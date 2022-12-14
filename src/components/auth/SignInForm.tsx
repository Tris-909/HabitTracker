import { useState } from "react";
import { firebase } from "initialize/firebase";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { GroupButtons } from "./GroupButtons";

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

  const signInHandler = () => {
    if (email && password) {
      setPersistence(auth, browserSessionPersistence).then(() => {
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
      <Heading size="4xl" mb="5rem">
        Habit Tracker
      </Heading>

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
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              signInHandler();
            }
          }}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        <GroupButtons
          actionHandler={signInHandler}
          actionText="Sign In"
          changeFormHandler={() => changeFormState("signup")}
          changeFormText="Create Account"
        />
      </FormControl>
    </Flex>
  );
};
