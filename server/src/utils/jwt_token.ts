import jwt from 'jsonwebtoken';
import { JWT_EXPIRY, JWT_SECRET } from '../config/app_config';
import type { UserRole } from '../types/user/user.entity';

const generateToken: (uuid: string, role: UserRole) => string = (
  uuid: string,
  role: UserRole
) => {
  return jwt.sign({ id: uuid, role: role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};

export { generateToken };
