import create from "zustand";

interface User {
  id?: string;
  email?: string;
  isAuthenticated?: boolean;
}

interface AppState {
  userInfo: User;
  setUserInfo: (user: User) => void;
  setUserAuthentication: (isAuthenticated: boolean) => void;
}

export const useAppState = create<AppState>((set) => ({
  // User
  userInfo: {},
  setUserInfo: (user: User) =>
    set((state) => ({ userInfo: { ...state.userInfo, ...user } })),
  setUserAuthentication: (isAuthenticated: boolean) =>
    set((state) => ({ userInfo: { ...state.userInfo, isAuthenticated } })),
}));
