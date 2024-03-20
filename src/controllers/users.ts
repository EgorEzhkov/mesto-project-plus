import { Request, Response } from "express";
import User from "../models/user";

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: "Некорректные данные" }));
};

export const getUsers = (req: Request, res: Response) => {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(404).send({ message: "Пользователи не найдены" }));
};

export const getUserById = (req: Request, res: Response) => {
  const id = req.params.userId;

  return User.findById(id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: "Пользователь не найден" }));
};
