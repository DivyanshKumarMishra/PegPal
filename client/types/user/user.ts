type UserRole = 'ADMIN' | 'USER';

type Gender = 'MALE' | 'FEMALE' | 'OTHERS';

interface UserPublic {
  id: string;
  full_name: string;
  email: string;
  gender: Gender;
  role: UserRole;
  image?: string | null;
}
