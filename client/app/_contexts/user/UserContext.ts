import { UserPublic } from '@/types/user/user';
import { createContext, useContext } from 'react';

export enum UserStatus {
  Loading,
  Authenticated,
  Guest,
}

type UserStateType = {
  user: UserPublic | null;
  userStatus: UserStatus;
  setUserStatus: (status: UserStatus) => void;
  initUser: () => void;
  clearUser: () => void;
};

const initValue: UserStateType = {
  user: null,
  userStatus: UserStatus.Guest,
  setUserStatus: (status: UserStatus) => {},
  initUser: () => {},
  clearUser: () => {},
};

const UserContext = createContext<UserStateType>(initValue);

function useUser() {
  return useContext(UserContext);
}

export { UserContext, useUser };
