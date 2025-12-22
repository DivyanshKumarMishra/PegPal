import express, { type Router } from 'express';
import * as authController from '../controllers/auth.controller';

const authRouter: Router = express.Router();

authRouter.post('/signup', authController.Signup);
authRouter.post('/login', authController.Login);

export default authRouter;
