import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAppState } from "state";

type PrivateRouteProps = {
  component: JSX.Element;
};

export const PrivateRoute = ({ component }: PrivateRouteProps) => {
  const userInfo = useAppState((state) => state.userInfo);
  const setUserAuthenticate = useAppState(
    (state) => state.setUserAuthentication
  );
  const auth = getAuth();
  const isAuthenticated = auth.currentUser;

  if (isAuthenticated?.email && !userInfo?.isAuthenticated) {
    setUserAuthenticate(isAuthenticated?.email ? true : false);
  }

  return userInfo?.isAuthenticated ? component : <Navigate to={"/auth"} />;
};
