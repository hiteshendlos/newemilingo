"use client"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// import logo from "@/assets/logo/logo.svg";
import logo from "@/assets/logo/newlogo.svg";
// import logo from "@/assets/logo/new Logo.png";

import Link from "next/link";
import { AiFillCaretDown, AiFillFacebook } from "react-icons/ai";
// import Navbar from "./Navbar/";
// import { bookMeetingSlice } from "@/store/slices";
import { GiHamburgerMenu } from "react-icons/gi";
import Navbar from "./navbar";
import { BsInstagram, BsLinkedin, BsTelephoneFill, BsTwitter } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { toast } from "react-hot-toast";

type Props = {
  isDarkTheme: boolean;
};

const Header: React.FC<Props> = ({ isDarkTheme }) => {
  
  const router = useRouter();
  const [hamburger, setHamburger] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [local, setLocale] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    if (typeof window !== 'undefined') {
      localStorage.getItem('token') && setLocale(true)
    
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const toggleBurger = () => {
    setHamburger(!hamburger);
  };

  return (
    <>
      <div className={` mx-auto sticky top-0 relative z-50 w-[100vw]  ${isSticky ? "bg-white shadow-lg" : "shadow-lg"}`} id="my-header-div">
      
        <header className={`container mx-auto sticky top-0    relative z-50 `}>
          <div className="flex items-center justify-between  py-3 lg:shadow-none  lg:px-0">
            <div className="flex items-center">
              {isDarkTheme && !isSticky ? (

                <>
                
                
                  <Image src={logo} alt="Endlos Logo" className="" />
                <Link href="/">
                  {/* <span>Endlos</span> */}
                </Link>
                {/* <Link href="/">
                  
                  <Image src={logo} alt="Endlos Logo" className="" />
                </Link> */}
                </>
              ) : (

                <>
                
                {/* <Link href="/" className=""> */}
                  {" "}
                  <Image src={logo} alt="Endlos Logo" className=" h-[40px] w-[200px] " />
                {/* </Link> */}
                </>
              )}
            </div>

            <div className="flex justify-between ">
              {/* <Navbar isDarkTheme={false} isOpen={hamburger} /> */}

            {local?<div className="flex items-center gap-4 md:ml-7">
             
                {/* <Link href="/login" className=" text-btn2 font-medium text-dodgerblue"> */}
                  <button className={`myfontback cursor-pointer`} onClick={()=>{

localStorage.clear()

router.push('/login')

toast.success("logout Successfully")

                  }} >
                    {" "}
                    Logout
                  </button>
                {/* </Link> */}

                <button className=" lg:hidden  cursor-pointer bg-transparent" onClick={toggleBurger}>
                  {/* <GiHamburgerMenus /> */}
                  <GiHamburgerMenu size={30} className={`  ${isDarkTheme && !isSticky ? "text-white" : ""}`} />
                  {/* <Image src={hamburgericon} className="h-[51px] w-[100%] " alt="Hamburger" /> */}
                </button>
                {/* <span className=" lg:hidden  cursor-pointer bg-transparent">
                  <GiHamburgerMenu />
                </span> */}
              </div>:<div className="flex items-center gap-4 md:ml-7">
                <Link href="/register" className=" text-btn2 font-medium text-dodgerblue">
                  <button className={`myfontback cursor-pointer`} >
                    {" "}
                    Register
                  </button>
                </Link>
                <Link href="/login" className=" text-btn2 font-medium text-dodgerblue">
                  <button className={`myfontback cursor-pointer`} >
                    {" "}
                    Login
                  </button>
                </Link>

                <button className=" lg:hidden  cursor-pointer bg-transparent" onClick={toggleBurger}>
                  {/* <GiHamburgerMenus /> */}
                  <GiHamburgerMenu size={30} className={`  ${isDarkTheme && !isSticky ? "text-white" : ""}`} />
                  {/* <Image src={hamburgericon} className="h-[51px] w-[100%] " alt="Hamburger" /> */}
                </button>
                {/* <span className=" lg:hidden  cursor-pointer bg-transparent">
                  <GiHamburgerMenu />
                </span> */}
              </div>} 
             
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
