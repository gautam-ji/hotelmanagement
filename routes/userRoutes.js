import express, { Router } from 'express'
import {getUserProfile, loginUser, registerUser } from '../controller/userController.js';
import authUser from "../middleware/authUser.js";


const userRouter = express();

userRouter.post('/register',registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/getProfile',authUser,getUserProfile)

export default userRouter