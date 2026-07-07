import reviewModel from "../models/reviewModel.js";
import listModel from  '../models/listModel.js'

const createReview  = async (req,res) => {
    try{
       
    const {userId,ListingId,comment,rating} = req.body;

    if(!userId || !ListingId || !comment || !rating){
     return res.json({success:false,message:"Required All fields"})
    }

    const newReview = new reviewModel({
      user:userId,
      listing:ListingId, 
      comment:comment,
      rating:Number(rating)
    })

   await newReview.save();

   //Recalculate average rating 
   const reviews = await reviewModel.find({listing: ListingId});

   const avgRating = reviews.reduce((acc,r) => acc + r.rating, 0) / reviews.length;

   await listModel.findByIdAndUpdate(ListingId, {rating: avgRating});


   
   return res.json({success:true,message:"Review Created Successfully",newReview})
    
        

    } catch(error){
      console.error(error)
    return  res.json({success:false,message:error.message})
    }
}

const updateReview = async(req,res) =>{
     try{

    } catch(error){
      console.error(error)
      res.json({success:false,message:error.message})
    }
} 

const deleteReview = async (req, res) =>{
     try{

    } catch(error){
      console.error(error)
      res.json({success:false,message:error.message})
    }
}




export {createReview,updateReview,deleteReview}