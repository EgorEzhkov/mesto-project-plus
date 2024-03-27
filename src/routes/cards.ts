import { Router } from 'express';
import {
  createCard,
  deleteCard,
  deletelikeCard,
  getCards,
  likeCard,
} from '../controllers/cards';

const router = Router();

router.post('/cards', createCard);
router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', deletelikeCard);

export default router;
