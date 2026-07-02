import jwt from 'jsonwebtoken'

const  authUser = (req,res,next) =>{
    const token = req.cookies;

    if(!token){
        return res.json({success:false,message:"Not authorized Login Again"})
    }

    const decode_token = jwt.verify(token,process.env.JWT_SECRET)
    req.body.userId = decode_token.id
    next()
}