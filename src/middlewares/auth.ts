import errors from '../errors/errors';
import { NextFunction, Request, Response } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;

  try {
    if (!cookie?.includes('authorization') || !cookie) {
      throw new errors.Error(errors.logInError, 'Необходима авторизация!');
    }
    const token = cookie.replace('authorization=', '');
    res.send({ token: token });
  } catch (err) {
    next(err);
  }
};
