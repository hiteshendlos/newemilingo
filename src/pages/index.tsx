import GoogleSignIN from "@/components/core/auth/googlesignin/GoogleSignIN";
import WhatpsApp from "@/components/whatsapp";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <div className="h-screen  w-screen flex justify-center items-center">
        <GoogleSignIN />

        {/* <WhatpsApp/> */}

       
        {/* <button className="bg-blue-600 text-white px-4 py-4 rounded-lg text-2xl hover:opacity-70">Fetch Emails</button> */}

        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}
