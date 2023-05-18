// import React, { useEffect, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

import GoogleIcon from "@/assets/google-icon.svg";
import { useCookies } from "react-cookie";
// import firebase from "@/app/services/utility/Firebase";
// import { useEffect, useState } from "react";
import firebase from "@/services/utility/Firebase";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GoogleAuthProvider } from "firebase/auth";

// import { cookieOptions, getEnvironment } from "../../../services/helpers/CookieHelper";
// import LoaderComponent from "../../HOC/LoaderComponent";
// import { ApiPostNoAuth } from "../../../services/helpers/API/ApiData";
// import { useNavigate } from "react-router-dom";
// import firebase from "../../../../firebase";

const SignInWithGoogle = (props:any) => {
  // Configure Firebase Authentication with Google sign-in provider
  const provider = new GoogleAuthProvider();

  // Define additional scopes for Google Calendar
  provider.addScope("https://www.googleapis.com/auth/calendar");

  const [signInWithGoogle, user, error] = useSignInWithGoogle(firebase, provider);

  const [loading, setLoading] = useState(false);
  const [, setCookies] = useCookies(["auth"]);

  useEffect(() => {
    handleSubmit(user);
  }, [user]);

  const handleSubmit = async (userD: any) => {
    if (!userD) return;
    // if (error) return toast.error(error.message);

    // setLoading(true);
    let data = {
      fullName: userD?.user?.displayName,
      email: userD?.user?.email,
      firebaseToken: userD?.user?.accessToken,
      isSocial: true,
      type: "google",

      platformType: "revu",
    };

    console.log({ data });

    console.log({ userD });

    // await ApiPostNoAuth(`user/login`, data)
    //   .then((res) => {
    //     setLoading(false);
    //     if (res.data.result !== -1) {
    //       setCookies("userinfo", res?.data?.payload?.admin, cookieOptions);
    //       setCookies("token", res?.data?.payload?.token, cookieOptions);
    //       setCookies("id", res?.data?.payload?.admin._id, cookieOptions);
    //       setCookies("environment", getEnvironment(), cookieOptions);
    //       toast.success(res?.data?.message);
    //       navigate("/");
    //       setLoading(false);
    //     }
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     toast.error(err?.response?.data?.message);
    //   });
  };

  return (
    <>
      <div className="google-icon-alignment" onClick={() => signInWithGoogle()}>
        {/* <img src={GoogleIcon} alt="google-icon" /> */}

        <Image src={GoogleIcon} alt="google icon" />
      </div>
    </>
  );
};

export default SignInWithGoogle;
