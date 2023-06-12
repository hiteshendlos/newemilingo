// const jwt = require("jsonwebtoken");

import  * as jwt from "jsonwebtoken"
import config from "../../services/config/index";


class jwtHelper {

// Function to generate access and refresh tokens
 generateTokens =(user:any)=> {

  try {

    if (config && config.jwtSecret) {
        const accessToken = jwt.sign({ user }, config.jwtSecret, { expiresIn: "1d" });
        const refreshToken = jwt.sign({ user }, config.jwtSecret, { expiresIn: "30d" });
        return { accessToken, refreshToken };
      } else {
        throw new Error("jwtSecret is missing from config");
      }
   
  } catch (err) {

    if (typeof err === "string") {
        throw new Error(err);
      } else {
        throw new Error("An error occurred");
      }
    
    
  }
}

// // Function to verify the access token
//  verifyAccessToken=(accessToken)=> {
//   try {

//     const decoded = jwt.verify(accessToken.split(" ")[1], config.jwtSecret);
//     // const decoded = jwt.verify(accessToken, config.jwtSecret);
//     return decoded.user;
//   } catch (err) {
//     // Token is invalid or has expired
//         throw new Error(err);
// }
// }

// Function to refresh the access token using the refresh token
//   refreshAccessToken=(refreshToken)=> {
//   try {
//     const decoded = jwt.verify(refreshToken, config.jwtSecret);
//     const { user } = decoded;
//     const accessToken = jwt.sign({ user }, config.jwtSecret, { expiresIn: "15m" });
//     return accessToken;
//   } catch (err) {

//         throw new Error(err)
//    }
// }

  
}



const  JwtHelper = new jwtHelper();

export default JwtHelper;