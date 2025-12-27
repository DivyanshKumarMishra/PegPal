export type UserRole = 'ADMIN' | 'USER';

export type Gender = 'MALE' | 'FEMALE' | 'OTHERS';

export interface UserPublic {
  id: string;
  full_name: string;
  email: string;
  gender: Gender;
  role: UserRole;
  image?: string | undefined;
}
