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

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', validation.getUserByIdValidation, getUserById);
router.patch('/me', validation.updateUserValidation, updateUser);
router.patch('/me/avatar', validation.updateAvatarValidation, updateAvatar);

export default router;
