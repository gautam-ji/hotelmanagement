import express from 'express'
import userAuth from '../middleware/authUser.js'
import { createReview, deleteReview, updateReview } from '../controller/reviewController.js'

const reviewRouter = express.Router()

reviewRouter.post('/create', createReview)
reviewRouter.post('/update',updateReview)
reviewRouter.post('/delte',userAuth,deleteReview)


export default reviewRouter