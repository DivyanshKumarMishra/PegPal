import express from 'express';
import * as userController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/me', userController.getUserDetails);

export default userRouter;
