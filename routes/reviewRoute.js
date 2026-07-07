import express from 'express'
import userAuth from '../middleware/authUser.js'
import { createReview, deleteReview, updateReview } from '../controller/reviewController.js'
import authAdmin from '../middleware/authAdmin.js'

const reviewRouter = express.Router()

reviewRouter.post('/create',userAuth, createReview)
reviewRouter.post('/update',userAuth,updateReview)
reviewRouter.post('/delete',userAuth,userAuth,deleteReview)


export default reviewRouter