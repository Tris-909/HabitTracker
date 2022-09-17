import React from "react";
import { getAuth } from "firebase/auth";
import { firebase } from "initialization/firebase";

export const AuthPage: React.FunctionComponent = () => {
  const auth = getAuth(firebase);

  return <div>Sign In</div>;
};
