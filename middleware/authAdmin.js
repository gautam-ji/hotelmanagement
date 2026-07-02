import jwt from 'jsonwebtoken'

const authAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies
    
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized Login Again" })
    }

    // Isko try-catch ke andar verify hona zaroori hai
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    
    // Admin check logic (Agar aapka koi specific admin role hai toh yahan condition lagayein)
    req.user = decode
    
    return next() // Sahi hone par hi agla middleware (Multer/Controller) chalega
  } catch (error) {
    console.error("Auth Middleware Error:", error.message)
    return res.status(401).json({ success: false, message: "Invalid or Expired Token. Please Login Again." })
  }
}

export default authAdmin