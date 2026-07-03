import jwt from 'jsonwebtoken'

const authAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies
    
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized Login Again" })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
     console.log(decode);
    if(decode.role !== "admin") {
      return res.json({success:false,message:"Access Denied"})
    }
       
    req.user = {id: decode.id};
    
    return next() 
  } catch (error) {
    console.error("Auth Middleware Error:", error.message)
    return res.status(401).json({ success: false, message: "Invalid Token " })
  }
}

export default authAdmin