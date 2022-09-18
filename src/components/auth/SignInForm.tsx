import { useState } from "react";
import { firebase } from "initialization/firebase";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Heading,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { MEDIA_QUERY } from "consts";
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
  const [isDesktop] = useMediaQuery(`(min-width: ${MEDIA_QUERY.DESKTOP})`, {
    ssr: false,
  });

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
