import { NextFunction, Request, Response } from 'express';
import { UserRequest } from '../types/types';
import Card from '../models/card';
import errors from '../errors/errors';

export const createCard = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  try {
    const card = await Card.create({ name, link, owner });

    return res.status(201).send({ data: card });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return next(new errors.ErrorExt(errors.badRequestError, 'Некорректые данные'));
    } else {
      return next(err);
    }
  }
};

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});

    return res.send({ data: cards });
  } catch (err) {
    return next(err);
  }
};

export const deleteCard = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId);

    if (!card) {
      throw new errors.ErrorExt(errors.notFoundError, 'Карточка не найдена');
    }

    if (String(card.owner) !== req.user!._id) {
      throw new errors.ErrorExt(errors.logInError, 'У вас нет доступа удалять чужие карточки');
    }

    const cardDeleted = await card.delete();

    return res.send({ data: cardDeleted });
  } catch (err: any) {
    if (err.name === 'CastError') {
      return next(new errors.ErrorExt(errors.notFoundError, 'Некорректный id карточки'));
    } else {
      return next(err);
    }
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

    if (!card) {
      throw new errors.ErrorExt(errors.notFoundError, 'Карточка не найдена');
    }

    return res.send({ data: card });
  } catch (err: any) {
    if (err.name === 'CastError') {
      return next(new errors.ErrorExt(errors.notFoundError, 'Некорректный id карточки'));
    } else {
      return next(err);
    }
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

    if (!card) {
      throw new errors.ErrorExt(errors.notFoundError, 'Карточка не найдена');
    }

    return res.send({ data: card });
  } catch (err: any) {
    if (err.name === 'CastError') {
      return next(new errors.ErrorExt(errors.notFoundError, 'Некорректный id карточки'));
    } else {
      return next(err);
    }
  }
};
