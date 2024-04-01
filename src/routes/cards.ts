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

router.post('/cards', validation.createCardValidation, createCard);
router.get('/cards', getCards);
router.delete('/cards/:cardId', validation.deleteCardValidation, deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', deletelikeCard);

export default router;
