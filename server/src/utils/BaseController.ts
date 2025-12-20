import type { Request, Response, NextFunction } from 'express';

type ControllerFunc = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const BaseController =
  (fn: ControllerFunc) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
