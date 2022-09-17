import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

type PrivateRouteProps = {
  component: JSX.Element;
};

export const PrivateRoute = ({ component }: PrivateRouteProps) => {
  const auth = getAuth();
  const isAuthenticated = auth.currentUser;

  return isAuthenticated ? component : <Navigate to={"/auth"} />;
};
