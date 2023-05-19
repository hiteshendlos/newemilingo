import { GoogleLogin, GoogleOAuthProvider, hasGrantedAllScopesGoogle, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useCookies } from "react-cookie";
function MyComponent() {



const [cookies, setCookies, removeCookie] = useCookies(["auth"]);

  const onSuccess = (codeResponse:any) => {
    console.log({codeResponse});








let data = JSON.stringify({
  token: codeResponse.code,
});

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "/api/auth/token",
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};

const response  = axios
  .request(config)
  .then((response) => {



if (response.data.result !== -1) {


  console.log({response})

  console.log(response?.data?.token?.access_token);
  // setCookies("access_token", response?.data?.token?.access_token);
//    setCookies("damm", "newName", {
//   path: "/",
//   domain: "localhost"
// });
  

  setCookies("auth", response?.data);

  console.log({ cookies });

}



    return response.data
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });







  };

  const login = useGoogleLogin({
    onSuccess: onSuccess,
    flow: "auth-code",
  scope: "openid email profile https://www.googleapis.com/auth/calendar",
  });

  return <button onClick={login}>Google Login</button>;
}


const GoogleSignIN = (props: any) => {



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
 


  return (
    <>
 
      <div className="">
        <GoogleOAuthProvider {...config}>
                <MyComponent/>
        </GoogleOAuthProvider>
      </div>
    </>
  );
};

export default GoogleSignIN;




