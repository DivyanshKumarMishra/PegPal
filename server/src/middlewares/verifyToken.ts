import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/app_config';
import { CustomError } from '../utils/CustomError';
import type { UserRole } from '../types/user/user.entity';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const jwt_token = req.cookies?.pegpal_jwt_token;
  if (!jwt_token) throw new CustomError('Unauthorized', 403);
  try {
    const payload = jwt.verify(jwt_token, JWT_SECRET) as {
      id: string;
      role: UserRole;
    };
    req.user = payload;
    next();
  } catch (error) {
    return next(new CustomError('Invalid or expired token', 401));
  }
};

export default verifyToken;
