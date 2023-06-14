import type { NextApiRequest, NextApiResponse } from "next";
import whatsAppSend from "../utility/whatsApp";
import EmailRead from "../utility/emailReadUtility";
import ChatGpt from "../utility/chatGpt";

import { connectToMongo } from "@/services/utility/db";
import User from "@/models/user";
import fetchGoogleEmails from "../utility/googleEmailRead";
import mongoose from "mongoose";
import refreshTokenGen from "../utility/refreshToken";

type DataType = {
  status?: boolean;
  msg?: any[];
  message?: string;
  emailResponse?: {};
  error?: any;
};


    function removeUnwanted(string:string) {
      // Remove curly brackets
      string = string.replace(/{|}/g, "");

      // Remove white spaces (excluding new lines)
      string = string.replace(/(?<!)\s/g, "");

      return string;
    }






export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
 

    //connection to db

    await connectToMongo();


    const allusr = await User.find({});


const email:any[] =[];

//     // const filteredUsers = allusr.filter(user => user.authorization.hasOwnProperty('gAccesstoken'));
    const filteredUsers = allusr.filter(user => user.authorization.gAccesstoken?.length>0);

    filteredUsers.map(async element=>{

      const emails = await fetchGoogleEmails(element.authorization.gAccesstoken)

      .catch(async(error)=>{

          if(error?.message ==='Invalid Credentials'){
         const gAccesstoken = await refreshTokenGen('1//0gu_Aazs72VdcCgYIARAAGBASNwF-L9IrUFXV7iuDm5ikJ8KwDywUrgokABNXOg3zQRO0x0JPadQdsBjLDO4lECv_fYVuaDj32L0')


         const userAccesstokenupdated = await User.findOneAndUpdate(
          { _id: element._id }, 
          {
            "authorization.gAccesstoken": gAccesstoken,
          },
          { new: true }
        );

        // console.log({userAccesstokenupdated});
        }

      



        
      })

      // console.log({emails});


      const alreadySended  = await User.findOne({
        _id: element._id,
        "lstmsgData.subject":emails?.subject
      })

      if(!alreadySended){

        console.log("new msg found");

              const user = await User.findOneAndUpdate(
        { _id:  element._id }, 
        {
          "lstmsgData.subject": emails?.subject,
          "lstmsgData.body": emails?.body,
    
        },
        { new: true }
      );


      

      const chatgptAsnwer =
   await ChatGpt(`Can you please provide important details for event or task for blocking the calendar event? bidercate it into "Event Name",${emails?.body}`);

   const finalMessage = removeUnwanted(chatgptAsnwer)
  finalMessage &&
   whatsAppSend(finalMessage,element.mobile)




      }


    })


    res.json({
      filteredUsers:filteredUsers.map(e=>e.name),
      // allusr,
      // email
    })




  } else if (req.method === "POST") {
   
  } else {
  res.status(405).json({ message: "Method Not Allowed" });
  }
}
