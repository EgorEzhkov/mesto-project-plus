import { NextFunction, Request, Response } from 'express';
import { UserRequest } from '../types/types';
import Card from '../models/card';
import errors from '../errors/errors';

export const createCard = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  try {
    const card = await Card.create({ name, link, owner });
    return res.send({ data: card });
  } catch {
    return next(new errors.Error(errors.badRequestError, 'Некорректные данные'));
  }
};

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});

    if (!cards || cards.length === 0) {
      throw new errors.Error(errors.notFoundError, 'Карточки не найдены');
    }

    return res.send({ data: cards });
  } catch (err) {
    return next(err);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndRemove(cardId);

    return res.send({ data: card });
  } catch {
    return next(new errors.Error(errors.notFoundError, 'Карточка не найдена'));
  }
};

export const likeCard = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );

    return res.send({ data: card });
  } catch (err: any) {
    return next(
      err.messageFormat === undefined
        ? new errors.Error(errors.notFoundError, 'Карточка не найдена')
        : err,
    );
  }
};

export const deletelikeCard = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  const userId = req.user?._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );

    return res.send({ data: card });
  } catch (err: any) {
    return next(
      err.messageFormat === undefined
        ? new errors.Error(errors.notFoundError, 'Карточка не найдена')
        : err,
    );
  }
};
