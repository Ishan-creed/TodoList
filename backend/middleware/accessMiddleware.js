const jwt = require('jsonwebtoken');
const config = require("./../Config.json");


const accessMiddleware = (req, res, next) => {

  const token = req.header('Authorization');
  
  console.log(res);
  // console.log(token);
  // Check if token is provided
//   if (!token) {
//     return res.status(401).json({ error: 'Access denied. Token not provided.' });
//   }

//   try {
//     // Verify and decode the token
//     const decoded = jwt.verify(token, config.accessTokenSecretKey);
//     console.log("Decoded",decoded); 
//     // Attach the user data to the request object
//     req.patientId = decoded.patientId;
//     // console.log("User",user);
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ error: 'Invalid token.' });
//   }
};

module.exports = accessMiddleware;
