'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { UserContext, UserStatus } from './UserContext';
import { axios_next } from '@/utils/Axios.client';
import { ME_URL } from '@/utils/Constants';
import { redirect } from 'next/navigation';
import { UserPublic } from '@/types/user/user';
import Loader from '@/app/_custom_components/Loader';

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPublic | null>(null);
  const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.Loading);

  const initUser = useCallback(async () => {
    try {
      const response = await axios_next.get(ME_URL);
      setUser(response?.data);
      setUserStatus(UserStatus.Authenticated);
    } catch (error) {
      // const err = CreateErrorObj(error);
      setUser(null);
      setUserStatus(UserStatus.Guest);
      redirect('/');
    }
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    setUserStatus(UserStatus.Guest);
  }, []);

  useEffect(() => {
    (async () => {
      await initUser();
    })();
  }, [initUser]);

  if (userStatus === UserStatus.Loading) return <Loader />;

  return (
    <UserContext.Provider
      value={{ user, userStatus, initUser, clearUser, setUserStatus }}
    >
      {children}
    </UserContext.Provider>
  );
}
