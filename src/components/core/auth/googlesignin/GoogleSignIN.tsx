import { GoogleLogin, GoogleOAuthProvider, hasGrantedAllScopesGoogle, useGoogleLogin } from "@react-oauth/google";
function MyComponent() {
  const onSuccess = (codeResponse:any) => {
    console.log(codeResponse);
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




