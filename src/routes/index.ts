import { Router } from 'express';
import userRouter from './users';
import cardsRouter from './cards';
import { notFoundAdress } from '../middlewares/error';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use('*', notFoundAdress);

export default router;
