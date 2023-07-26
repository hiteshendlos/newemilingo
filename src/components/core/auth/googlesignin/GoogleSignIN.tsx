import { GoogleLogin, GoogleOAuthProvider, hasGrantedAllScopesGoogle, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
function MyComponent() {
  // const [cookies, setCookies, removeCookie] = useCookies(["auth"]);

  const  [User,setUser] = useState<any>()

  async function settingEvent(accessToken:any) {
 let config = {
   method: "post",
   maxBodyLength: Infinity,
   url: "/api/email",
   headers: {
     "Content-Type": "application/json",
   },
   data: {
     accessToken: accessToken,
   },
 };

  const id = toast.loading("Fetching Email And Setting Event...");
      try {


       let response = await axios(config)

       .then(data=>{


         toast.success("Event Successfully Set", { id });

       })
     
      } catch (error) {

        
        toast.error("try after sometime Later", { id });
 console.error(error);

        
      }


 
  }

  // Call the function to start the API calling process
  // callAPIUntilSuccess();

  const onSuccess = (codeResponse: any) => {


    console.log({ codeResponse });

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

    const response = axios
      .request(config)
      .then(async (response:any) => {
        if (response.data.result !== -1) {


          console.log("datais ",response.data);









        
          let data = JSON.stringify({
            gAccesstoken: response.data.token.access_token,
            gRfreshtoken:response.data.token.refresh_token

          });
          
          let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `/api/user/update?id=${User?._id}`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response:any) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error:any) => {
            console.log(error);
          });
          











          const updatingToken = await axios.put(`/api/user/update?id=${User?._id}`)
     

        }


        return response.data;
       
      })
      .catch((error:any) => {
        console.log(error);
      });
  };



  const login = useGoogleLogin({
    onSuccess: onSuccess,
    flow: "auth-code",
    scope: "openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.readonly",
  });


useEffect(()=>{
 if (window){

    
   const user:any = localStorage.getItem("user")
   const user2 =JSON.parse(user)
   setUser(user2)
}
},[])

  return <>
  

  <button onClick={login} className="flex flex-col justify-center items-center">
    

    <FcGoogle size={50}/>
    Authunticate
       </button>
  
  </>
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
 
      <div className=" bg-blue-500 text-white px-4 py-4 rounded-lg text-2xl">
        <GoogleOAuthProvider {...config}>
                <MyComponent/>
        </GoogleOAuthProvider>
      </div>
    </>
  );
};

export default GoogleSignIN;




