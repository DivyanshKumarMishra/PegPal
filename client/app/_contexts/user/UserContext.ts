import { createContext, useContext } from 'react';

type UserStateType = {
  user: UserPublic | null;
  userLoading: boolean;
  setUserLoading: (loading: boolean) => void;
  initUser: () => void;
  clearUser: () => void;
};

const initValue: UserStateType = {
  user: null,
  userLoading: false,
  setUserLoading: (loading: boolean) => {},
  initUser: () => {},
  clearUser: () => {},
};

const UserContext = createContext<UserStateType>(initValue);

function useUser() {
  return useContext(UserContext);
}

export { UserContext, useUser };
