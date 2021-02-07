import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/authMiddleware';

const router = Router();

router.post('/users', UserController.store);
router.post('/session', SessionController.store);

router.use(authMiddleware);

router.get('/dashboard', UserController.index);

export default router;
