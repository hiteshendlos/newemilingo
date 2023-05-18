// import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { useEffect, useState } from "react";
import Image from "next/image";
import GoogleLogin from "react-google-login";


const NewGoogleSignIN = (props: any) => {

const onSuccess =(response:any)=>{
    console.log({ response });
}
const onFailure = (error:any) => {
  console.log({error});
};

  return (
    <>
      <div className="">
        <GoogleLogin
          clientId="846260142876-1ikkf0rpkviln05h2ncvng5buoa2ld9k.apps.googleusercontent.com"
          buttonText="Sign in With Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          //   this is important

          responseType="code"
          accessType="offline"
          scope="openid email profile https://www.googleapis.com/auth/calendar "
        />
      </div>
    </>
  );
};

export default NewGoogleSignIN;
