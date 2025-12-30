'use client';

import { useUser } from '@/app/_contexts/user/UserContext';
import UserSummary from '@/app/_custom_components/User/UserSummary';
import UserTabView from '@/app/_custom_components/User/UserTabView';

function Profile() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <UserSummary user={user} />
      <UserTabView />
    </div>
  );
}

export default Profile;
