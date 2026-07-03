import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
const { token } = req.cookies

  if (!token) {
    return res.json({ success: false, message: "Not authorized Login Again" });
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);


  if (!decode) {
    return res.json({ success: false, message: "Unauthorized Access" });
  }

  if (decode.role !== "user") {
    res.json({ success: false, message: "Unauthorized Access" });
  }
  req.user = { id: decode.id };

  next();
};

export default authUser;
