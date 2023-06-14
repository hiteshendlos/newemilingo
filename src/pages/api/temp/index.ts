import type { NextApiRequest, NextApiResponse } from "next";
import fetchGoogleEmails from "../utility/googleEmailRead";
import ChatGpt from "../utility/chatGpt";
import whatsAppSend from "../utility/whatsApp";
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



    try {
      // const emails = await fetchGoogleEmails("6a29.a0AWY7CkkJsXOMltbqK1w5oaxrB5u8A8znrrFGTTbui_DBSP8vutK0G3x3QLRF78x6-1UaUXo1CXjymMQQB6USTLo1jwBDgRRHmC-GKef5auZlZe7hUMVd5l4XgL923-t4ZDWD-GOVBC9gPhNcMxiVFNXxf2x7tdqLaCgYKARwSARMSFQG1tDrpMklJ6xG7VLqvTWk3kjk0lw0167")
      const emails = await fetchGoogleEmails("ya29.a0AWY7CkkYlagWdKe9Ymupolzl_l5qt70N7V0RrQ7unha-GfZUyPrl0ESR435xt4gol-Na3VlEXJMRUyCsjjFJaVZrKhp0peOR1FCqpMQAuU-W6IIY0e58WwZ7nAg_7C1Tg7rxf4k35q6q6WAcMZ614hXfckLb5BfkaCgYKAdYSARMSFQG1tDrpedA_jos05E9-1wO1n66Npg0167")
      .catch(async(error)=>{

        // console.log(JSON.parse(error));

        if(error?.message ==='Invalid Credentials'){


          console.log("getting access token from refresh token ");

         const accessToken = await refreshTokenGen('1//0gu_Aazs72VdcCgYIARAAGBASNwF-L9IrUFXV7iuDm5ikJ8KwDywUrgokABNXOg3zQRO0x0JPadQdsBjLDO4lECv_fYVuaDj32L0')

         console.log(accessToken);

        }
      })

      console.log({emails});
      
    } catch (error) {

      

      console.log("myerror2",error);
      
    }

  



   res.send("emails")

   
  //  const chatgptAsnwer =
  //  await ChatGpt(`Can you please provide important details for event or task for blocking the calendar event? bidercate it into "Event Name",${emails?.body}`);


            //  console.log(chatgptAsnwer);

            //  const finalMessage = removeUnwanted(chatgptAsnwer)



      //        finalMessage &&
      // whatsAppSend(finalMessage).then((response) => {

      //   console.log(response);
      //   res.status(200).json({ message: "Chat gpt Answer sended" + finalMessage });
      // });


      // res.status(200).json({ message: "Chat gpt Answer sended"  });

        // res.status(200).json({ message: "Welcome to temp api route" ,error:emails });
     

    // response && res.status(200).json({ message: "This is a GET request", emailResponse: response });
  } else if (req.method === "POST") {
   
  } else {
  res.status(405).json({ message: "Method Not Allowed" });
  }
}
