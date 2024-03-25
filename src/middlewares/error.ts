import { NextFunction, Request, Response } from 'express';
import errors from '../errors/errors';

const error = (
  err: { statusCode: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 && !err.message ? 'На сервере произошла ошибка' : message,
  });
  next();
};

export const notFoundAdress = (req: Request, res: Response) => {
  res.status(errors.notFoundError).send({ message: 'Запрашиваемый ресурс не найден' });
};

export default error;
