import { MenuItem } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useStore, useStepStore, useGoalStore } from "state";

export const LogOutButton = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const clearUserStore = useStore((state) => state.clearUserStore);
  const clearGoalStore = useGoalStore((state) => state.clearGoalStore);
  const clearStepsStore = useStepStore((state) => state.clearStepsStore);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        clearStore();
        navigate("/auth");
      })
      .catch((error) => {
        console.log("error signing out", error.message);
      });
  };

  const clearStore = () => {
    clearUserStore();
    clearGoalStore();
    clearStepsStore();
  };

  return (
    <MenuItem icon={<FiLogOut />} onClick={() => signOutHandler()}>
      Log out
    </MenuItem>
  );
};
