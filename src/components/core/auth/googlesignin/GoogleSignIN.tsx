import { GoogleLogin, GoogleOAuthProvider, hasGrantedAllScopesGoogle, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
function MyComponent() {
  const [cookies, setCookies, removeCookie] = useCookies(["auth"]);

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
      .then((response) => {
        if (response.data.result !== -1) {
          console.log({ response });

          console.log(response?.data?.token?.access_token);

          setCookies("auth", response?.data);

          console.log({ cookies });

          //calling api for setting event to calendar

          // let config2 = {
          //   method: "post",
          //   maxBodyLength: Infinity,
          //   url: "/api/email",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   data: {
          //     accessToken : response?.data?.token?.access_token
          //   },
          // };

          // const doneEvent = axios.request(config2)
          // .catch(error=>{
          //   if(error.message="Unexpected token R in JSON at position 0"){
          //     axios.request(config2);
          //   }
          // })





settingEvent(response?.data?.token?.access_token);


        }


        return response.data;
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   const bookEvent =async ()=>{

  //      let success = false;
  //   while (!success) {
  //     try {
  //       const response = await fetch('your-api-endpoint');
  //       const data = await response.json();

  //       // Check for successful response
  //       if (response.ok) {
  //         success = true;
  //         // Process the data or return it
  //         return data;
  //       } else {
  //         // Handle error response
  //         console.error(data);
  //       }
  //     } catch (error) {
  //       // Handle network errors or other exceptions
  //       console.error(error);
  //     }

  //     // Wait for a certain duration before retrying
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //   }

  //   // Optional: Handle a maximum retry count to prevent an infinite loop

  //   // If no successful response is received, you can return an error or take appropriate action
  //   throw new Error('Unable to get a successful response from the API after multiple attempts.');
  // }

  const login = useGoogleLogin({
    onSuccess: onSuccess,
    flow: "auth-code",
    scope: "openid email profile https://www.googleapis.com/auth/calendar",
  });

  return <button onClick={login}>Authunticate with Google for setting event </button>;
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
 
      <div className=" bg-blue-600 text-white px-4 py-4 rounded-lg text-2xl">
        <GoogleOAuthProvider {...config}>
                <MyComponent/>
        </GoogleOAuthProvider>
      </div>
    </>
  );
};

export default GoogleSignIN;




