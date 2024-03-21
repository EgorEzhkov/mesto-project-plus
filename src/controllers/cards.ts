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

export const likeCard = async (req: UserRequest, res: Response) => {
  const { cardId } = req.params;

  const userId = req.user?._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );

    if (!card) {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }

    return res.send({ data: card });
  } catch {
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

export const deletelikeCard = async (req: UserRequest, res: Response) => {
  const { cardId } = req.params;

  const userId = req.user?._id;

  try {
    const card = await Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true });

    if (!card) {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }

    return res.send({ data: card });
  } catch {
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
