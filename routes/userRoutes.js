import express, { Router } from 'express'
import {getUserProfile, loginUser, registerUser, UpdatePassword, UpdateUserProfile } from '../controller/userController.js';
import authUser from "../middleware/authUser.js";


const userRouter = express();

userRouter.post('/register',registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/getProfile',authUser,getUserProfile)
userRouter.post('/updateprofile',authUser,UpdatePassword)
userRouter.post("/updatePassword",authUser,UpdateUserProfile)

export default userRouter