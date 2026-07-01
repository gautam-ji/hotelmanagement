import express from 'express'
import 'dotenv/config'
import connectDB from './config/connectdb.js'
import userRouter from './routes/userRoutes.js'



//api config
const app = express()
const port = 4000
connectDB()

//middleware
app.use(express.json())

//api endpoints
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("api Working")
})

app.listen(port, () =>{
     console.log("server running on port " + port)
})

