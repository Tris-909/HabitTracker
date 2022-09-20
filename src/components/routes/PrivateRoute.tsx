import { Navigate } from "react-router-dom";
import { useAuthState } from "initialization/firebase";

type PrivateRouteProps = {
  component: JSX.Element;
};

export const PrivateRoute = ({ component }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuthState();

  return isAuthenticated ? component : <Navigate to={"/auth"} />;
};
