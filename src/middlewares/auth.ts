import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/types';
import errors from '../errors/errors';

export default async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;

  if (!cookie?.includes('jwt') || !cookie) {
    return next(new errors.ErrorExt(errors.logInError, 'Необходима авторизация!'));
  }

  const token = cookie.replace('jwt=', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return next(new errors.ErrorExt(errors.logInError, 'Необходима авторизация!'));
  }

  req.user = payload;

  return next();
};
