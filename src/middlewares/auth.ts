import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRequest } from 'types/types';
import errors from '../errors/errors';

export default async (req: UserRequest, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;

  if (!cookie?.includes('jwt') || !cookie) {
    next(new errors.Error(errors.logInError, 'Необходима авторизация!'));
    return;
  }

  const token = cookie.replace('jwt=', '');
  let payload: string | JwtPayload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new errors.Error(errors.logInError, 'Необходима авторизация!'));
  }

  req.user!._id = String(payload!);

  next();
};
