import { UserRequest } from "types/types";
import { Request, Response } from "express";
import Card from "../models/card";

export const createCard = (req: UserRequest, res: Response) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  return Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: "Некорректные данные" }));
};

export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(404).send({ message: "Карточки не найдены" }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: "Карточка не найдена" }));
};
