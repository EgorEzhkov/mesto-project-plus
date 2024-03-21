import { Request, Response } from 'express';
import User from '../models/user';

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });
    return res.send({ data: user });
  } catch {
    return res.status(400).send({ message: 'Некорректные данные' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.send({ data: users });
  } catch {
    return res.status(404).send({ message: 'Пользователи не найдены' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.userId;

  try {
    const user = await User.findById(id);
    return res.send({ data: user });
  } catch {
    return res.status(404).send({ message: 'Пользователь не найден' });
  }
};
