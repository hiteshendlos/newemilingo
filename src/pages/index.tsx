import GoogleSignIN from "@/components/core/auth/googlesignin/GoogleSignIN"
// import Header from @/components/layout/header";
import Header from "@/components/Layout/header/index";
import WhatpsApp from "../components/whatsapp";
import { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { useRouter } from 'next/router';
import FileUploadAndAnswer from "../components/pagecomponent/home/uploadFileAndAsk";

export default function Home() {

  const router =useRouter()

  const [isRender,setRender]= useState(false)
  const [isSetupDone,setSetup]= useState(false)

  useEffect(()=>{
    if (window){

      
      setRender(true)
      
      const user:any = localStorage.getItem("user")
      const parsedUser = JSON.parse(user)

      if(parsedUser?.authorization?.gAccesstoken &&parsedUser?.authorization?.gRfreshtoken)setSetup(true)
      // // console.log({a:parsedUser.authorization.gAccesstoken &&parsedUser.authorization.gRfreshtoken})
      !user &&router.push('/login')

    
      


   }
   },[])


   

    return (


       <>
  
      <Header isDarkTheme={false}/>
  
  
  
        <div className="h-screen  w-screen flex justify-center items-center">
    



       {

isSetupDone?<span className="bg-green-500 text-white py-5 px-5 border rounded-xl"> Congratulations You Have Done Setup </span>:      <GoogleSignIN />

       }   
  
          {/* <WhatpsApp/> */}
  
         
          {/* <button className="bg-blue-600 text-white px-4 py-4 rounded-lg text-2xl hover:opacity-70">Fetch Emails</button> */}
  
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </>
    );
   }

 

