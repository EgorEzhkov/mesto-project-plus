import { NextFunction, Request, Response } from 'express';
import { UserRequest } from '../types/types';
import User from '../models/user';
import errors from '../errors/errors';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });

    if (!name || !about || !avatar) {
      throw new errors.Error(errors.badRequestError, 'Некорректные данные');
    }

    return res.status(201).send({ data: user });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return next(new errors.Error(errors.badRequestError, 'Некорректные данные')); // обрабатываем ошибку валидации
    } else {
      return next(err);
    }
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});

    if (!users || users.length < 1) {
      throw new errors.Error(errors.notFoundError, 'Пользователи не найдены');
    }

    return res.send({ data: users });
  } catch (err) {
    return next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;

  try {
    const user = await User.findById(id);
    return res.send({ data: user });
  } catch {
    return next(new errors.Error(errors.notFoundError, 'Пользователь не найден'));
  }
};

export const updateUser = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  const id = req.user?._id;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new errors.Error(errors.notFoundError, 'Пользователь не найден');
    }

    if (!name || !about) {
      throw new errors.Error(errors.badRequestError, 'Некорректые данные');
    }

    return res.send({ data: user });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return next(new errors.Error(errors.badRequestError, 'Некорректные данные')); // обрабатываем ошибку валидации
    } else {
      return next(err);
    }
  }
};

export const updateAvatar = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  const id = req.user?._id;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new errors.Error(errors.notFoundError, 'Пользователь не найден');
    }

    if (!avatar) {
      throw new errors.Error(errors.badRequestError, 'Некорректые данные');
    }

    return res.send({ data: user });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return next(new errors.Error(errors.badRequestError, 'Некорректные данные')); // обрабатываем ошибку валидации
    } else {
      return next(err);
    }
  }
};
