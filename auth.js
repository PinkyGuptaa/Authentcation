const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;


// const adminAuth = (permissions) => {
//     return (req,res,next) => {
//         const adminRole = req.body.role;
//         //const id= req.body.id;
//         if(permissions.includes(adminRole)){
//             next()
//         }
//         else{
//             return res.status(401).json('you dont have permission')
//         }
//     }
// };
// const userAuth = (permissions) => {
//     return (req,res,next) => {
//         const userRole = req.body.role;
//         if(permissions.includes(userRole)){
//             next()
//         }
//         else{
//             return res.status(401).json('you dont have permission')
//         }
//     }
// };
// module.exports = {adminAuth, userAuth}

// exports.adminAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, jwtSecret, (err, decodedToken) => {
//       if (err) {
//         return res.status(401).json({ message: "Not authorized" });
//       } else {
//         if (decodedToken.role !== "admin") {
//           return res.status(401).json({ message: "Not authorized" });
//         } else {
//           next();
//         }
//       }
//     });
//   } else {
//     return res
//       .status(401)
//       .json({ message: "Not authorized, token not available" });
//   }
// };
// exports.userAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, jwtSecret, (err, decodedToken) => {
//       if (err) {
//         return res.status(401).json({ message: "Not authorized" });
//       } else {
//         if (decodedToken.role !== "Basic") {
//           return res.status(401).json({ message: "Not authorized" });
//         } else {
//           next();
//         }
//       }
//     });
//   } else {
//     return res
//       .status(401)
//       .json({ message: "Not authorized, token not available" });
//   }
// };