import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,required:true,
    },
    email:{
        type:String,required:true,unique:true
    },
    password:{
        type:String,required:true
    },
    role: {
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    imageUpload:{
        type:String,
    },
    wishList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Listing'
        }
    ]
  
   
},{    
    timestamps:true
})

const userModel = mongoose.model('user',userSchema)

export default userModel