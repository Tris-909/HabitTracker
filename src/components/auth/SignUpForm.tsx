import { useState } from "react";
import { firebase } from "initialization/firebase";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Heading,
  Flex,
} from "@chakra-ui/react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { GroupButtons } from "./GroupButtons";
import { notify, notifyRules } from "components";

export const SignUpForm = ({
  changeFormState,
}: {
  changeFormState: (formState: string) => void;
}) => {
  const auth = getAuth(firebase);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUpHandler = async () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          sendEmailVerification(user);
          notify({
            notifyMessage: "Please verify the user's email before login",
            notifyRule: notifyRules.NOTIFICATION,
          });
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
      <Heading size="4xl" mb="5rem">
        Habit Tracker
      </Heading>
      <Heading size="3xl" mb="2rem">
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
        <GroupButtons
          actionHandler={signUpHandler}
          actionText="Sign Up"
          changeFormHandler={() => changeFormState("signin")}
          changeFormText="Already have an account ?"
        />
      </FormControl>
    </Flex>
  );
};
