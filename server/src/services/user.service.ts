import { CustomError } from '../utils/CustomError';
import { prisma } from '../db/prisma';
import type { UserEntity } from '../types/user/user.entity';

const getUserDetails: (id: string) => Promise<UserEntity> = async (
  id: string
) => {
  if (!id) throw new CustomError('Invalid User', 400);
  const db_user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!db_user) throw new CustomError(`User doesn't exist`, 400);
  return db_user;
};

export { getUserDetails };
