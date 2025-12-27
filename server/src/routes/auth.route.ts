import express, { type Router } from 'express';
import * as authController from '../controllers/auth.controller';
import verifyToken from '../middlewares/verifyToken';

const authRouter: Router = express.Router();

authRouter.post('/signup', authController.Signup);
authRouter.post('/login', authController.Login);
authRouter.post('/logout', verifyToken, authController.Logout);

export default authRouter;
