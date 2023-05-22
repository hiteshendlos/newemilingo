import GoogleSignIN from "@/components/core/auth/googlesignin/GoogleSignIN";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <div className="h-screen  w-screen flex justify-center items-center">
        <GoogleSignIN />

        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}
