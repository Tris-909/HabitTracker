import { MenuItem } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const LogOutButton = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate("/auth");
      })
      .catch((error) => {
        console.log("error signing out", error.message);
      });
  };

  return (
    <MenuItem icon={<FiLogOut />} onClick={() => signOutHandler()}>
      Log out
    </MenuItem>
  );
};
