import express from 'express'
import userAuth from ''
import { createReview, deleteReview, getAllReview, updateReview } from '../controller/reviewController'

const reviewRouter = express.Router()

reviewRouter.post('/createReview', createReview)
reviewRouter.post('/updateRoute',updateReview)
reviewRouter.post('delteReview',deleteReview)


export default reviewRouter