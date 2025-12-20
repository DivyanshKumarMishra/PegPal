import type { LoginValues, SignupValues } from '../types/auth/auth.schema';
import { comparePassword, generatePassword } from '../utils/password';
import { prisma } from '../db/prisma';
import type { UserEntity } from '../types/user/user.entity';
import { CustomError } from '../utils/CustomError';

const signup: (data: SignupValues) => Promise<UserEntity> = async (
  data: SignupValues
) => {
  const { password, ...payload } = data;
  const hashed_pass = await generatePassword(password);

  const record: UserEntity = await prisma.user.create({
    data: {
      ...payload,
      password: hashed_pass,
    },
  });

  return record;
};

const login: (data: LoginValues) => Promise<UserEntity> = async (
  data: LoginValues
) => {
  const { password, email } = data;
  const db_user: UserEntity | null = await prisma.user.findUnique({
    where: { email },
  });

  if (!db_user) throw new CustomError(`User doesn't exist`, 400);
  const isValidUser = await comparePassword(password, db_user.password);
  if (!isValidUser) throw new CustomError('Incorrect Password', 401);

  return db_user;
};

export { signup, login };
