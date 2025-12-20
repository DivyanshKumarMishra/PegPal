import jwt from 'jsonwebtoken';
import { JWT_EXPIRY, JWT_SECRET } from '../config/app_config';

const generateToken: (uuid: string) => string = (uuid: string) => {
  return jwt.sign({ userId: uuid }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

export { generateToken };
