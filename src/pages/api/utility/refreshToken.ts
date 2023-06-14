// import {  OAuth2Client } from "google-auth-library";




// class myauth extends OAuth2Client {
//     async  getrefreshToken  (refreshToken:any):Promise<string>  {
//         const token = await this.refreshToken(refreshToken);  // Accessing Animal class protected method inside Dog class
//         console.log('Dog is barking');

//         console.log(token);
//     }
// }



// export default async function refreshTokenGen(refreshToken:string) {


//     try {
//         const config = {
//             clientId: "846260142876-1ikkf0rpkviln05h2ncvng5buoa2ld9k.apps.googleusercontent.com",
//             clientSecret: "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",
//           };
      
//           const myauthinstance = new myauth()

//           const result = myauthinstance.getrefreshToken(refreshToken)

//           console.log({result});



//         // const oAuth2Client = new OAuth2Client(config.clientId, config.clientSecret);
//         // const { tokens } = await oAuth2Client.refreshToken(refreshToken);
//         // // const { tokens } = await oAuth2Client.refreshAccessToken(refreshToken);
//         // const accessToken = tokens.access_token;
  


        
//         // console.log({mytokennn:tokens});
//         // const accessToken = tokens;

//         // return accessToken;
    
        
//     } catch (error) {

//         return error
        
//     }

// }




const axios = require('axios');

export default async function refreshTokenGen(refreshToken:string) {

            const config = {
            clientId: "846260142876-1ikkf0rpkviln05h2ncvng5buoa2ld9k.apps.googleusercontent.com",
            clientSecret: "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",
          };


  const tokenUrl = 'https://oauth2.googleapis.com/token';

  const requestBody = new URLSearchParams();
  requestBody.append('refresh_token', refreshToken);
  requestBody.append('client_id', config.clientId);
  requestBody.append('client_secret', config.clientSecret);
  requestBody.append('grant_type', 'refresh_token');

  try {
    const response = await axios.post(tokenUrl, requestBody);
    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Error: Unable to retrieve access token from refresh token.', error);
    return null;
  }
}

