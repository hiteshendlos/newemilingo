import type { NextApiRequest, NextApiResponse } from "next";
import fetchGoogleEmails from "../utility/googleEmailRead";
import ChatGpt from "../utility/chatGpt";
import whatsAppSend from "../utility/whatsApp";

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


export default async function handler(req: NextApiRequest, res: NextApiResponse<DataType>) {
  if (req.method === "GET") {


   const emails = await fetchGoogleEmails()

   
   const chatgptAsnwer =
   await ChatGpt(`Can you please provide important details for event or task for blocking the calendar event? bidercate it into "Event Name",${emails?.body}`);


            //  console.log(chatgptAsnwer);

             const finalMessage = removeUnwanted(chatgptAsnwer)



             finalMessage &&
      whatsAppSend(finalMessage).then((response) => {

        console.log(response);
        res.status(200).json({ message: "Chat gpt Answer sended" + finalMessage });
      });


        // res.status(200).json({ message: "Welcome to temp api route" ,error:emails });
     

    // response && res.status(200).json({ message: "This is a GET request", emailResponse: response });
  } else if (req.method === "POST") {
   
  } else {
  res.status(405).json({ message: "Method Not Allowed" });
  }
}
