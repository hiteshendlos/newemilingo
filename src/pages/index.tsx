import GoogleSignIN from "../components/Core/auth/googlesignin/GoogleSignIN"
import Header from "../components/layout/header";
import WhatpsApp from "../components/whatsapp";
import { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { useRouter } from 'next/router';

export default function Home() {

  const router =useRouter()

  const [isRender,setRender]= useState(false)

  useEffect(()=>{
    if (window){
   
      setRender(true)
       
      const user:any = localStorage.getItem("user")
      !user &&router.push('/login')
   }
   },[])


   

    return (


       <>
  
      <Header isDarkTheme={false}/>
  
  
  
        <div className="h-screen  w-screen flex justify-center items-center">
          <GoogleSignIN />
  
          {/* <WhatpsApp/> */}
  
         
          {/* <button className="bg-blue-600 text-white px-4 py-4 rounded-lg text-2xl hover:opacity-70">Fetch Emails</button> */}
  
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </>
    );
   }

 

