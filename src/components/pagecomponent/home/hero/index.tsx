// import Register from "../../../../components/Core/forms/Register";
import Register from "../../../Core/forms/Register";

const HomeHero = () => {
  


  return (
    <div className="headandfoot md:py-10 h-[92vh] ">
      {/* <Header isDarkTheme={false} /> */}
      <main className="mt-20">
        <div className=" relative z-10 container mx-auto  flex  flex-wrap justify-between  items-center gap-10 md:gap-0 py-10 ">
          <div className="flex justify flex-col h-full space-y-6 sm:space-y-11 px-5 lg:px-0  md:max-w-[50%]">
            {/* <b className="inline-block text-head2 sm:text-[48px] leading-tight sm:leading-[79px]"> */}
            <h1 className="m-0 text-dodgerblue text-hfsize-2 md:text-hfsize-1 font-semibold myfontback">Email Automation</h1>
            {/* <p className="m-0 text-myblack ">CloudCastle</p> */}
            {/* </b> */}
            <div className="w-full text-xl leading-[30px] text-slategray inline-block ">
              <p className="m-0  ">We{`'`}re excited to share our Email Automation expertise and services.</p>
            </div>

            <div className="pt-[14px]">
           
            </div>
          </div>

          {/* <div className="hidden md:block  h-full w-full ">
            <Image src={herosectionimg} alt="" className="max-h-[306px]" />
          </div> */}

          <div className="md:flex  justify-center items-center w-full  md:w-[50%] xl:px-20 ">
            <div className=" sm:max-w-[90%]  md:w-[100%] lg:max-w-[95%] xl:max-w-lg border-2   bg-white p-8 rounded-lg shadow-xl">
              <Register />
            </div>

            {/* <Image src={herosectionimg} alt="Unreal Engine | Endlos" className=" max-h-[150px]  md:max-h-[250px]  lg:max-h-[277px] " /> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeHero;
