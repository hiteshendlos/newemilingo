import GoogleSignIN from "../components/Core/auth/googlesignin/GoogleSignIN"
import Header from "../components/layout/header";
import WhatpsApp from "../components/whatsapp";
import { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { useRouter } from 'next/router';
import FileUploadAndAnswer from "../components/pagecomponent/home/uploadFileAndAsk";

export default function Home() {

    return (


       <>
  
      <Header isDarkTheme={false}/>
  
  
  
        <div className="h-screen  w-screen flex justify-center items-center headandfoot">

        <FileUploadAndAnswer/>

          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </>
    );
   }

 

