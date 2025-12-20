export type Gender = 'MALE' | 'FEMALE' | 'OTHERS';

export type UserRole = 'USER' | 'ADMIN';

export interface UserEntity {
  id: string;
  full_name: string;
  email: string;
  password: string;
  gender: Gender;
  role: UserRole;
  image?: string | null;
  created_at: Date;
  updated_at: Date;
}