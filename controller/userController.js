import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import validator from 'validator'
import bcrypt from 'bcrypt'

const createToken = (id) =>{
  return  jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'})
}

//Register user 
const registerUser = async(req, res) =>{
 try{
     const {email,password,userName} = req.body

  const Exists = await userModel.findOne({email})

  if(Exists){
    return res.json({success:false,message:"User Already Exists"})
  }

 if(!validator.isEmail(email)){
    return res.json({success:false,message:"Please Enter a Valid Email"})
 }
 if(!validator.isStrongPassword(password)){
    return res.json({success:false,message:"Plese Enter a Strong Password"})
 }

 const salt = await bcrypt.genSalt(10)
 const hashedPassword = await bcrypt.hash(password,salt)

 const createUser = {
    userName:userName,
    email:email,
    password:hashedPassword
 }

const user =  new userModel(createUser)
await user.save();

const token = createToken(user._id);

return res.json({success:true,token})



 } catch(error){
     return res.json({success:false,message:error.message})
}
   
}
//LoginUser
const loginUser = async(req, res) =>{
   try{
    const {email,password} = req.body

   const user = await userModel.findOne({email})

   if(!user){
    return res.json({success:false,message:"Invalid Email or password"})
   }

   const isMatch = await bcrypt.compare(password,user.password)

   if(!isMatch){
      return res.json({success:false, message:"Invalid Email or Password"})
   }

   const token =  createToken(user._id)
   
   return res.json({success:true,token})

   } catch(error){
    console.error(error)
    return res.json({success:false,message:error.message})
   }
 }

//adminLogin
const adminLogin = async(req, res) =>{
   const {email, password} =  req.body
   
    if(email !== process.env.ADMIN_EMAIL) {
      return res.json({success:false,message:"Invalid email"})
    }

    // Compare hashed password stored in env 
   if(password !== process.env.ADMIN_PASSWORD) {
      return res.json({success:false, message:"Please Enter a valid password"})
   }
  

    const token = jwt.sign(
      {role: "admin", email},
      process.env.JWT_SECRET,
      {expiresIn:'1d'}
    )

     return res.json({success:true,token});

}

export {registerUser,loginUser,adminLogin}
