'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { axios_next } from '@/utils/Axios.client';
import { ME_URL } from '@/utils/Constants';
import { redirect } from 'next/navigation';
import { UserPublic } from '@/types/user/user';

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPublic | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(false);

  const initUser = useCallback(async () => {
    setUserLoading(true);
    try {
      const response = await axios_next.get(ME_URL);
      setUser(response?.data);
    } catch (error) {
      // const err = CreateErrorObj(error);
      redirect('/');
    } finally {
      setUserLoading(false);
    }
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
  }, []);

  useEffect(() => {
    initUser();
  }, [initUser]);

  return (
    <UserContext.Provider
      value={{ user, userLoading, initUser, clearUser, setUserLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}
