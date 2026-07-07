import 'dotenv/config'
import express from 'express'
import connectDB from './config/connectdb.js'
import userRouter from './routes/userRoutes.js'
import listRouter from './routes/listRoute.js'
import connectCloudinary from './config/cloudinary.js'
import cookieParser from 'cookie-parser'
import reviewRouter from './routes/reviewRoute.js'



//api config
const app = express()
const port = 8000
connectDB()

// connectCloudinary();

//middleware
app.use(express.json())
app.use(cookieParser());

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/list',listRouter)
app.use('/api/review',reviewRouter)

app.get('/',(req,res)=>{
    res.send("api Working")
})

app.listen(port, () =>{
     console.log("server running on port " + port)
})

