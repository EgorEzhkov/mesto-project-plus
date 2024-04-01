import { Router } from 'express';
import validation from '../utils/validation';
import {
  getUser,
  getUserById,
  getUsers,
  updateAvatar,
  updateUser,
} from '../controllers/users';

const router = Router();

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.get('/users/:userId', validation.getUserByIdValidation, getUserById);
router.patch('/users/me', validation.updateUserValidation, updateUser);
router.patch('/users/me/avatar', validation.updateAvatarValidation, updateAvatar);

export default router;
