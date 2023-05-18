// import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GoogleLogin, GoogleOAuthProvider, hasGrantedAllScopesGoogle, useGoogleLogin } from "@react-oauth/google";

import axios from "axios";
import {  } from "react-google-login";
// import { GoogleAuth } from "google-auth-library";


function MyComponent() {
  const onSuccess = (codeResponse:any) => {
    console.log(codeResponse);
  };

  const login = useGoogleLogin({
    onSuccess: onSuccess,
    flow: "auth-code",
    // scope: ["openid", "email", "profile", "https://www.googleapis.com/auth/calendar"],

    scope: "openid email profile https://www.googleapis.com/auth/calendar",
  });

  return <button onClick={login}>Google Login</button>;
}


const New2GoogleSignIN = (props: any) => {



    const config = {
      clientId: "846260142876-1ikkf0rpkviln05h2ncvng5buoa2ld9k.apps.googleusercontent.com",
      ClientSecret: "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",

      // scopes: "openid email profile https://www.googleapis.com/auth/calendar",
      cookiePolicy: "single_host_origin",
      accessType: "offline",
      responseType: "code",
      // prompt:"consent"

      flow: "implicit ",
    };

// const { signIn, signOut, authState } = useGoogleAuth(config);



// const auth = new GoogleAuth({
//   clientId: config.clientId,
//   clientSecret: config.ClientSecret,
//   redirectUri: "http://localhost:3000",
// });


// const authUrl = auth.generateAuthUrl({
//   access_type: "offline",
//   scope: ["openid", "email", "profile", "https://www.googleapis.com/auth/calendar"],
// });

  const onSuccess = async(response: any) => {




    // const { tokens } = await auth.getToken(response.);
    console.log({ response });
  };
  const onFailure = (error: any) => {
    console.log({ error });
  };






      // clientId:"846260142876-1ikkf0rpkviln05h2ncvng5buoa2ld9k.apps.googleusercontent.com"
    //       scope:"openid email profile https://www.googleapis.com/auth/calendar"
        //   cookiePolicy:{"single_host_origin"}
        //   accessType:"offline"
        //   responseType:"code"




        
    // const login = useGoogleLogin({
    //   onSuccess: (tokenResponse) => console.log(tokenResponse),
    // });

      // const { signIn } = useGoogleLogin({
      //   // clientId: "846260142876-1ikkf0rpkviln05h2ncvng5buoa2ld9k.apps.googleusercontent.com",
      //   // onSuccess: onSuccess,
      //   // onFailure: onFailure,
      //   // accessType: "offline",
      //   // responseType: "code",
      //   // prompt: "consent",
      // });


    //  const login = useGoogleLogin({
    //    onSuccess: (codeResponse) => console.log(codeResponse),
    //    flow: "auth-code",
    //  });

  return (
    <>
      {/* <div className="">
        <GoogleOAuthProvider {...config}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const { credential } = credentialResponse;

              // if (credential) {
              //   const hasAccess = hasGrantedAllScopesGoogle(credentialResponse.credential, "email", "profile");

              //   console.log(hasAccess);
              // }

              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div> */}

      <div className="">
        <GoogleOAuthProvider {...config}>
          {/* <button onClick={() =>{

const login = useGoogleLogin({
  onSuccess: (codeResponse) => console.log(codeResponse),
  flow: "auth-code",
});

          }}>login</button> */}


          <MyComponent/>
        </GoogleOAuthProvider>
      </div>
    </>
  );
};

export default New2GoogleSignIN;











      // axios
      //   .post("https://accounts.google.com/o/oauth2/token", {
      //     code: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgyMjgzOGMxYzhiZjllZGNmMWY1MDUwNjYyZTU0YmNiMWFkYjViNWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODQzOTI3NjgsImF1ZCI6Ijg0NjI2MDE0Mjg3Ni0xaWtrZjBycGt2aWxuMDVoMm5jdm5nNWJ1b2EybGQ5ay5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMzkyODI1NDU0OTQxMzQ5OTQ4MiIsImVtYWlsIjoiaGl0ZXNoLmVuZGxvc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiODQ2MjYwMTQyODc2LTFpa2tmMHJwa3ZpbG4wNWgybmN2bmc1YnVvYTJsZDlrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IkhpdGVzaCBLdW1hciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhaRTRYTm01Y2hUTFY0bDNDQmRYQUtSX1lsTS1vWS1yNS1Sdkk5TD1zOTYtYyIsImdpdmVuX25hbWUiOiJIaXRlc2giLCJmYW1pbHlfbmFtZSI6Ikt1bWFyIiwiaWF0IjoxNjg0MzkzMDY4LCJleHAiOjE2ODQzOTY2NjgsImp0aSI6Ijc1MDFhYmY1OWE2MGExYTNiNTJjZTEyYTc3YmM0OGJjY2U0MzY2YTUifQ.lAsbUVwTD31t6vhsTMj6qidPIXjZU8HTb2vGm2fPbaI83-KWfyAKCoz7WJYwaoMZAXRjbLimzXxNM3i4ZOWNnE1sxmGO-6AbbkpxGDE-nqPF2ClM1htHsR9rR1ohbiqtZHwqxbCEbQVNTf4Ru3SvRu3MRJDlJT88ef0Oj5O6eIu7TEycyjevHW5Y6TXX0xUjUL3tWWAZ2lrfqLdySuM8IvfEai2GPGkCjxDON_JQpVO495S1K6aR8qX2chd5AbCHmosz3yRjZvNoTxD1IRjNgZ7WyZBa1iu6ig4YGAo6ixspmIKYAxtcKaT5sgPGnira4lcWyWDab2RyyUY54XwBkQ",
      //     client_id: "846260142876-1ikkf0rpkviln05h2ncvng5buoa2ld9k.apps.googleusercontent.com",

      //     client_secret: config.ClientSecret,
      //     grant_type: "authorization_code",
      //   })
      //   .then((response) => {
      //     console.log({ response });
      //     const accessToken = response.data.access_token;
      //     const refreshToken = response.data.refresh_token;
      //     // Store the access token and refresh token securely for later use
      //   })
      //   .catch((error) => {
      //     console.error("Error exchanging authorization code for access token:", error);
      //   });
