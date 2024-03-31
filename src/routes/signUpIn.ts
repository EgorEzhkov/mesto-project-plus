import { Router } from 'express';
import { login, createUser } from '../controllers/users';
import validation from '../utils/validation';

const router = Router();

router.post('/signin', validation.signInValidation, login);
router.post('/signup', validation.signUpValidation, createUser);

export default router;
