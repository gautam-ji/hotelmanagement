import reviewModel from "../models/reviewModel";


const createReview  = async (req,res) => {
    try{
       

        

    } catch(error){
      console.error(error)
      res.json({success:false,message:error.message})
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




export {createReview,updateReview,deleteReview,getAllReview}