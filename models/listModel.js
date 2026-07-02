import mongoose from "mongoose";

const listSchema =  new mongoose.Schema({
    title:{
      type:String, required:true,
      trim:true
    },
    description:{
        type:String, required:true,
        trim:true
    },
    images:[
        {
            type:String, required:true
        }
    ],
    price:{
        type:Number, required:true
    },
    guest:{
        type:Number, required:true,min:1
    },
    bedroom:{
        type:Number,required:true
    },
    bed:{
        type:Number,required:true,min:1
    },
    bathroom:{
       type:Number,required:true,min:1
    },
    location:{
        type:String,
        required:true
    },
    propertyType:{
          type:String,
          enum:[
            "Apartment",
            "Villa",
            "hotel",
            "house"
          ],
          required:true
    },
    rating:{
        type:Number,
        default:0,
        min:0,
        max:5
    },
    available:{
        type:Boolean,
        default:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
 
},{
    timestamps:true
})

const listModel = mongoose.model('Listing',listSchema)

export default  listModel