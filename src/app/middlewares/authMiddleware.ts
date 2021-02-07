import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import envConfig from '../../config/environment.config';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('No token provided');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, envConfig.jwtSecret);
    const { id } = decoded as TokenPayload;
    req.userId = id;

    return next();
  } catch {
    throw new Error('Invalid token');
  }
};
