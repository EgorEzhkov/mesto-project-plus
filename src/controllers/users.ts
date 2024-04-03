import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRequest } from '../types/types';
import User from '../models/user';
import errors from '../errors/errors';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  try {
    const user = await bcrypt
      .hash(password, 10)
      .then((hash) => User.create({ name, about, avatar, email, password: hash }));

    return res.status(201).send({ data: user });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return next(new errors.ErrorExt(errors.badRequestError, 'Некорректные данные')); // обрабатываем ошибку валидации
    } else if (err.message === 'Illegal arguments: undefined, number') {
      return next(new errors.ErrorExt(errors.badRequestError, 'Введите пароль'));
    } else if (err.code === 11000) {
      return next(new errors.ErrorExt(errors.conflictError, 'Email уже существует'));
    } else {
      return next(err);
    }
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});

    return res.send({ data: users });
  } catch (err) {
    return next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new errors.ErrorExt(errors.notFoundError, 'Пользователь не найден');
    }

    return res.send({ data: user });
  } catch (err: any) {
    if (err.name === 'CastError') {
      return next(new errors.ErrorExt(errors.badRequestError, 'Некорректный id пользователя'));
    } else {
      return next(err);
    }
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
      throw new errors.ErrorExt(errors.notFoundError, 'Пользователь не найден');
    }

    return res.send({ data: user });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return next(new errors.ErrorExt(errors.badRequestError, 'Некорректные данные')); // обрабатываем ошибку валидации
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
      throw new errors.ErrorExt(errors.notFoundError, 'Пользователь не найден');
    }

    return res.send({ data: user });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return next(new errors.ErrorExt(errors.badRequestError, 'Некорректные данные')); // обрабатываем ошибку валидации
    } else {
      return next(err);
    }
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new errors.ErrorExt(errors.logInError, 'Неверный логин или пароль');
    }

    const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
    return bcrypt
      .compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new errors.ErrorExt(errors.logInError, 'Неверный логин или пароль');
        }
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
          .send({ message: 'Вы успешно вошли' });
      })
      .catch((err) => {
        if (err.message === 'Illegal arguments: undefined, string') {
          return next(new errors.ErrorExt(errors.badRequestError, 'Введите пароль'));
        } else {
          return next(err);
        }
      });
  } catch (err: any) {
    return next(err);
  }
};

export const getUser = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { _id } = req.user!;

  try {
    const user = await User.findById(_id);

    if (!user) {
      throw new errors.ErrorExt(errors.notFoundError, 'Пользователь не найден');
    }

    res.send({ info: user });
  } catch (err) {
    next(err);
  }
};
