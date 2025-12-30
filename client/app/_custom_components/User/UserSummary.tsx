'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPublic } from '@/types/user/user';
import { HiOutlineLogout } from 'react-icons/hi';
import { IoPerson } from 'react-icons/io5';

const userMetrics = {
  friends: { label: 'Friends', count: 10 },
  posts: { label: 'Post', count: 5 },
};

function UserSummary({ user }: { user: UserPublic | null }) {
  return (
    user && (
      <div className="flex flex-col w-full md:w-1/3 gap-10 bg-black/50 backdrop-blur-xl rounded-md p-5 lg:px-10">
        <div className="flex w-full justify-center">
          <div className="w-full aspect-square max-w-40 md:max-w-60">
            <Avatar className="w-full h-full">
              <AvatarImage src={user?.image} className="object-cover" />
              <AvatarFallback className="bg-accent w-full h-full flex items-center justify-center">
                <IoPerson className="w-1/2 h-1/2" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 justify-center items-center">
          <h3 className="text-2xl lg:text-3xl font-bold ">{user?.full_name}</h3>
          <div className="flex gap-5 md:gap-10 justify-center items-center md:justify-start">
            {Object.entries(userMetrics)?.map(([key, { label, count }]) => (
              <div
                key={key}
                className="flex flex-col items-center justify-center"
              >
                <span className="text-xl md:text-2xl text-muted-foreground">
                  {label}
                </span>
                <span className="text-xl md:text-2xl font-bold text-accent">
                  {count}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5 w-full">
            <Button type="button" className="w-full">
              Edit profile
            </Button>
            <Button type="button" variant="outline" className="w-full">
              Logout
              <HiOutlineLogout />
            </Button>
          </div>
        </div>
      </div>
    )
  );
}

export default UserSummary;
