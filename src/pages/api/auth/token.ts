import { GoogleAuth } from "google-auth-library";
import type { NextApiRequest, NextApiResponse } from "next";
const {
  OAuth2Client,
} = require('google-auth-library');


type DataType = {
  status?: boolean;
  msg?: any[];
  message?: string;
  emailResponse?: {};
  error?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<DataType>) {

    
  try {
    //     const config = {
    //       clientId: "846260142876-1ikkf0rpkviln05h2ncvng5buoa2ld9k.apps.googleusercontent.com",
    //       clientSecret: "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",
    //       // scopes: ["openid", "email", "profile", "https://www.googleapis.com/auth/calendar"],
    //       scopes: "openid email profile https://www.googleapis.com/auth/calendar",
    //       cookiePolicy: "single_host_origin",
    //       accessType: "offline",
    //       responseType: "code",
    //        redirectUri: "http://localhost:3000",
    //     };

    //     //   const config = {
    //     //     clientId: "your-client-id",
    //     //     clientSecret: "your-client-secret",
    //     //     redirectUri: "http://localhost:3000",
    //     //   };

    //       const credentialBody = {
    //         client_id: config.clientId,
    //         client_secret: config.clientSecret,
    //         redirect_uris: [config.redirectUri],
    //         grant_type: "authorization_code",
    //         // Web: {},
    //       };

    // ``
    //     const auth = new GoogleAuth(
    //     //     {
    //     //   clientId: config.clientId,
    //     //   clientSecret: config.ClientSecret,
    //     //   redirectUri: "http://localhost:3000",
    //     // }

    //     );

    //     // console.log(auth.
    //     auth.fromJSON(credentialBody);

    //     const {tokens  = await auth.getCredentials(req.body.token);
    //     // const { access_token, refresh_token } = tokens;
    //     // const authUrl = auth.generateAuthUrl({
    //     //   access_type: "offline",
    //     //   scope: ["openid", "email", "profile", "https://www.googleapis.com/auth/calendar"],
    //     // });

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

      const { tokens } = await oAuth2Client.getToken("4/0AbUR2VOx5du6Inf4WISXSxzOYiP1NFqB4ljUbbyLEQndwTutxX4yozb4tKFA9i5bx1y-EQ"); // exchange code for tokens
      console.log({tokens});


      
      res.status(200).json({ emailResponse: "tokens" });

  } catch (error) {
    res.status(401).json({ message: error });
  }
}
