import express from 'express';
import { getHome, postRegister, postLogin, getMe } from './controller';
import auth from '../auth';

const router = express.Router();

router.get('/', getHome);

router.post('/register', postRegister);

router.post('/login', postLogin);

router.get('/me', auth.ensureAuth(), getMe);

export default router;
