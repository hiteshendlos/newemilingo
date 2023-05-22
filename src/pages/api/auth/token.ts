import { GoogleAuth, OAuth2Client } from "google-auth-library";
import type { NextApiRequest, NextApiResponse } from "next";
import { useCookies } from "react-cookie";




type DataType = {
  status?: boolean;
 message?: string;
 token?: string;
 error?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<DataType>) {


   if (req.method === "GET") {
   
     res.status(200).json({ message: "This is a GET request" });
   } else if (req.method === "POST") {
     

        
  try {


    const {token} =req.body;
const config = {
      clientId: "846260142876-1ikkf0rpkviln05h2ncvng5buoa2ld9k.apps.googleusercontent.com",
      clientSecret: "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",
      // scopes: ["openid", "email", "profile", "https://www.googleapis.com/auth/calendar"],
      scopes: "openid email profile https://www.googleapis.com/auth/calendar",
      cookiePolicy: "single_host_origin",
      accessType: "offline",
      responseType: "code",
      redirectUri: "http://localhost:3000",
    };

    const oAuth2Client = new OAuth2Client(config.clientId, config.clientSecret, "postmessage");

    // const { tokens } = await oAuth2Client.getToken("4/0AbUR2VOx5du6Inf4WISXSxzOYiP1NFqB4ljUbbyLEQndwTutxX4yozb4tKFA9i5bx1y-EQ"); // exchange code for tokens
    const { tokens } = await oAuth2Client.getToken(token); // 



    console.log({tokens});

    res.status(200).json({
     status:true, 
      token:tokens
     });
  } catch (error) {
    res.status(401).json({ status:false,error: error });
  }
    
   } else {
     // Handle other HTTP methods
     res.status(405).json({ message: "Method Not Allowed" });
   }


}


