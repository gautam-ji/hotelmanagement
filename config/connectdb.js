import mongoose from "mongoose";

const connectDB =  async() =>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/hotelmanagement`)
        console.log("mongoDB connected")
        
    } catch(error){
       console.log('mongoose connection faield '+error)
    }
}
export default connectDB