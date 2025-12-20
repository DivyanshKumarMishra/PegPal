import express, { type Router } from 'express';
import {
  LoginController,
  SignupController,
} from '../controllers/auth.controller';

const authRouter: Router = express.Router();

authRouter.post('/signup', SignupController);
authRouter.post('/login', LoginController);

export default authRouter;
