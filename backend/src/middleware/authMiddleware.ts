import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Aquí usamos verifyToken directamente como un middleware
  verifyToken(req, res, next);
};


