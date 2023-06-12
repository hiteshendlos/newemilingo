import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { bookMeetingSlice } from "@/store/slices";

import Link from "next/link";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Url } from "next/dist/shared/lib/router/router";
// import { useDispatch } from "react-redux";
type Props = {
  isDarkTheme: boolean;
  isOpen: boolean;
};
type LinksType = {
  name?: string;
  link?: string;
  submenu?: boolean;

  sublinks?: { name: string; link: string }[];
};

const Navbar: React.FC<Props> = ({ isDarkTheme, isOpen }) => {
  
  // const MeetingRequest = () => {
  //   dispatch(bookMeetingSlice.actions.bookMeetingRequest());
  // };
  const router = useRouter();
  //   const [hamburger, setHamburger] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [subHeading, setSubHeading] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
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

  const links: any = [
    {
      name: "Home",
      link: "/",
      submenu: false,
      // onclick:()=>{ 
      //   window.open("https://www.endlos.tech/", "_blank");
      // }
    },
    // {
    //   name: "Services",
    //   submenu: true,
    //   sublinks: [
    //     { name: "Cloud Transformation", link: "/" },
    //     { name: "DevSecOps", link: "/devsevops" },
    //     { name: "Cloud Security Engineering", link: "/" },
    //     { name: "Application Modernization ", link: "/" },
    //     { name: "Cloud Platform Development Solutions ", link: "/" },
    //   ],
    // },
    // {
    //   name: "Book Meeting",
    //   link: "https://www.endlos.tech/contact.html",
    //   submenu: false,
    //   // onClick: MeetingRequest,
    // },
  ];

  return (
    <>
      <div className="flex justify-between ">
        <nav className="hidden lg:flex font-medium">
          <ul className={`flex items-center text-black ${!isSticky && isDarkTheme ? "text-black" : "text-dogeblue"}`}>
            {links?.map((links: any, index: number) => {
              return (
                <li key={index} className="mx-5 relative cursor-pointer group flex gap-1 items-center">
                  {
                    links.link ? (
                      links.onClick ? (
                        <span
                          onClick={links.onClick}
                          className={`${
                            router.pathname.toLocaleLowerCase() == links.link.toLowerCase() ? "myfontback" : null
                          } text-btn2 font-medium text-dodgerblue`}
                        >
                          {links.name}
                        </span>
                      ) : (
                        // <Link href={links.link}>
                        <a href={links.link == "/" ? "/" : links.link} target={links.link == "/" ? "" : "_blank"}>
                          <span
                            className={`${
                              router.pathname.toLocaleLowerCase() == links.link.toLowerCase() ? "myfontback" : null
                            } text-btn2 font-medium text-dodgerblue`}
                          >
                            {links.name}
                          </span>
                        </a>
                      )
                    ) : null
                    // </Link>
                    // <>
                    //   <span className={`${router.pathname.toLocaleLowerCase() == links.name.toLowerCase() ? "text-dodgerblue" : null} text-btn2`}>
                    //     {links.name}
                    //   </span>

                    //   <AiFillCaretDown />
                    // </>
                  }

                  {links.submenu && (
                    <div className="">
                      <div className="absolute left-0 top-5 hidden group-hover:md:block hover:md:block ">
                        <div className="py-3">
                          <div
                            className="w-4 h-4 left-3 absolute 
                    mt-1 bg-white rotate-45"
                          ></div>
                        </div>
                        <div className="bg-white gap-10 pt-3">
                          {links &&
                            links?.sublinks &&
                            links?.sublinks.map((mysublinks: any, index: number) => (
                              <Link
                                href={mysublinks.link}
                                className=" pl-4 min-w-[150px] w-[22rem] py-3 text-[17px] text-black block hover:bg-dodgerblue hover:text-white"
                                key={index}
                              >
                                {mysublinks.name}
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {/* Mobile menus */}
      <div
        className={` ${!isOpen ? "hidden" : ""}
     absolute left-0 right-0 top-[65px] bg-white h-[100vh]
    `}
      >
        {links?.map((slinks: any, index: number) => (
          <div key={index}>
            <div>
              {!slinks.submenu ? (




                <Link
                  // href={slinks?.link}
                  href={slinks?.link as Url}
                  target="_blank"
                  onClick={() => (subHeading !== slinks.name ? setSubHeading(slinks?.name) : setSubHeading(""))}
                  className="font-medium text-btn3 py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-start  items-center md:pr-0 pr-5 cursor-pointer hover:bg-dodgerblue hover:text-white"
                >
                  {slinks.name}

                  <span className="text-xl md:mt-1 md:ml-2 inline">
                    {" "}
                    {slinks.submenu ? slinks.name == subHeading ? <AiFillCaretUp className=" ml-3" /> : <AiFillCaretDown className=" ml-3" /> : ""}
                  </span>
                </Link>
              ) : (
                <h1
                  onClick={() => (subHeading !== slinks.name ? setSubHeading(slinks.name) : setSubHeading(""))}
                  className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-start  items-center md:pr-0 pr-5 cursor-pointer hover:bg-dodgerblue hover:text-white"
                >
                  {slinks.name}
                  {slinks.submenu ? slinks.name == subHeading ? <AiFillCaretUp className=" ml-3" /> : <AiFillCaretDown className=" ml-3" /> : ""}

                  <span className="text-xl md:mt-1 md:ml-2 inline">
                    {/* <ion-icon
                  name={`${
                    subHeading === slinks.Head
                      ? "chevron-up"
                      : "chevron-down"
                  }`}
                ></ion-icon> */}
                  </span>
                </h1>
              )}

              {/* <div className={`${subHeading === slinks.name ? "md:hidden" : "hidden"}`}>
                {slinks.submenu &&
                  slinks?.sublinks?.map((element, index) => (
                    <li key={index} className="py-3 pl-14 hover:bg-dodgerblue hover:text-white list-none">
                      <Link href={element.link}>{element.name}</Link>
                    </li>
                  ))}
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;

//Navbar is
