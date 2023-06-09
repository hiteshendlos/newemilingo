import axios from "axios";
import { toast } from "react-hot-toast";

const WhatpsApp = (props: any) => {



    const fetchAndSend =async ()=>{


         let config = {
           method: "get",
           maxBodyLength: Infinity,
           url: "/api/cron/",
           headers: {
             "Content-Type": "application/json",
           },
         };

           const id = toast.loading("Fetching Email And Sending Message ...");
           try {
             let response = await axios(config).then((data) => {
               toast.success("What's App Message Send Successfully", { id });
             });
           } catch (error) {
             toast.error("try after sometime Later", { id });
             console.error(error);
           }
         }
    
  return (
    <>
      <button className=" bg-blue-600 text-white px-4 py-4 rounded-lg text-2xl" onClick={fetchAndSend}>
     Fetch and Send Msg
      </button>
    </>
  );
};

export default WhatpsApp;
