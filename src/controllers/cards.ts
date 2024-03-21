import { Request, Response } from 'express';
import { UserRequest } from '../types/types';
import Card from '../models/card';

export const createCard = async (req: UserRequest, res: Response) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  try {
    const card = await Card.create({ name, link, owner });
    return res.send({ data: card });
  } catch {
    return res.status(400).send({ message: 'Некорректные данные' });
  }
};

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    return res.send({ data: cards });
  } catch {
    return res.status(404).send({ message: 'Карточки не найдены' });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndRemove(cardId);
    return res.send({ data: card });
  } catch {
    return res.status(404).send({ message: 'Карточка не найдена' });
  }
};
