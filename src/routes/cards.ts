import { Router } from 'express';
import validation from '../utils/validation';
import {
  createCard,
  deleteCard,
  deletelikeCard,
  getCards,
  likeCard,
} from '../controllers/cards';

const router = Router();

router.post('/', validation.createCardValidation, createCard);
router.get('/', getCards);
router.delete('/:cardId', validation.deleteCardValidation, deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', deletelikeCard);

export default router;
