import express, { Router } from 'express'
import { adminLogin, loginUser, registerUser } from '../controller/userController.js';

const userRouter = express();

userRouter.post('/register',registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin',adminLogin)

export default userRouter