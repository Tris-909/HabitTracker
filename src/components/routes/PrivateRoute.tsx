import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  component: JSX.Element;
};

export const PrivateRoute = ({ component }: PrivateRouteProps) => {
  const isAuthenticated = false;

  return isAuthenticated ? component : <Navigate to={"/auth"} />;
};
