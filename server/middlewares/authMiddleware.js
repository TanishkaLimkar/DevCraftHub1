// const jwt = require("jsonwebtoken");
// const User = require("../models/user-model")

// const authMiddleware = async(req, res, next) => {
//     const token = req.header('Authorization');
//     if(!token )
//     {
//         return req.status(401).json({message: "Unauthorized Http , Token not provided"});
//     }
//     const jwtToken = token.replace("Bearer","").trim();
//     console.log("token from auth middleware" , jwtToken)
//     try {
//         const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY); 
      

//         const userData = await User.findOne({email: isVerified}).select({password:0});
//         console.log(userData);

//         req.user= userData;
//         req.token = token;
//         req.userId= userData._id;
//         next(); 
//     } catch (error) {
//         return res.status(401).json({message:"Invalid token !!"})
//     }
 
// };
// //the third  parameter is always next or else the user will never be fprwarded to auth-controller after the verifictaion of the token
// module.exports = authMiddleware;
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
  }

  try {
    const jwtToken = token.replace("Bearer", "").trim();
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    // Assuming decoded contains user information
    const userData = await User.findById(decoded.userId).select({ password: 0 });

    if (!userData) {
      return res.status(401).json({ message: "Invalid token, user not found" });
    }

    req.user = userData;
    req.token = token;
    req.userId = userData._id;
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
