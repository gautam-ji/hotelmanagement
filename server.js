import express from 'express'
import 'dotenv/config'
import connectDB from './config/connectdb.js'



//api config
const app = express()
const port = 4000
connectDB()

//middleware

//api endpoints

app.get('/',(req,res)=>{
    res.send("api Working")
})

app.listen(port, () =>{
     console.log("server running on port " + port)
})

