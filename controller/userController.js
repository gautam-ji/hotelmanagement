import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";



const createToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
//Register user
const registerUser = async (req, res) => {
  try {
    const { userName, email, password, joinAdminCode } = req.body;

    if (!userName || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const Exists = await userModel.findOne({ email });
    if (Exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    let role = "user";

    if (joinAdminCode && joinAdminCode === process.env.JOIN_ADMIN) {
      role = "admin";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      userName: userName,
      password: hashedPassword,
      email: email,
      role,
    };

    const user = await new userModel(newUser);

    await user.save();

    const token = createToken(user._id,user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    res.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//LoginUser
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid Email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Email or Password" });
    }

    const token = createToken(user._id,user.role);

   res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    return res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

//getUserProfile
const getUserProfile = async(req,res)=>{
   try{
  

  const user = await userModel.findById(req.user.id);
  if(!user){
    res.json({success:false,message:"User not Found"})
  }

  const {password:pass, ...rest} = user._doc

    return res.json({success:true,user:rest})
   } catch(error) {
    console.error(error)
    return res.json({success:false,message:error.message})
   }
}

// UpdateUserProfile
const UpdatePassword = async (req,res) =>{
  try{

    const {password, newPassword,} = req.body

    const user = await userModel.findOne({_id: req.user.id})

    if(!user){
      return res.json({success:false,message:"User not found"  })
    }

    if(!password || !newPassword) {
      res.json({success:false,message:"Plese Enter oldPassword or NewPassword"})
    }  

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
      res.json({success:false,message:"old Password not match"})
    }

   user.password =  await bcrypt.hash(newPassword,10)

   await user.save()

   return res.json({success:true,message:'password update SuccessFully'})

  } catch(error){
    console.error(error)
    return res.json({success:false,message:error.message})
  }
}

// UpdateProfile 
const UpdateUserProfile = async (req, res) =>{
  try{
    const {userName,email,password} = req.body
    console.log(userName)

  const user = await userModel.findOne({_id: req.user.id});

  if(!user){
    res.json({success:false,message:'user not found'})
  }

  const isMatch = await bcrypt.compare(password,user.password)
   
  if(!isMatch){
    res.json({success:false,message:"Incorrect Password"})
  }

  user.userName = userName || user.userName
  user.email = email || user.email 

   const updateUser = await user.save();

   return res.json({success:true,message:"Profile Update Successfully",updateUser})
  } catch(error){
       console.error(error)
       return res.json({success:false,message:error.message})
  }
}

export { registerUser, loginUser, getUserProfile ,UpdatePassword, UpdateUserProfile};
