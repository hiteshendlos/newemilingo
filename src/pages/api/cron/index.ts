import type { NextApiRequest, NextApiResponse } from "next";
import whatsAppSend from "../utility/whatsApp";
import EmailRead from "../utility/emailReadUtility";
import ChatGpt from "../utility/chatGpt";

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
    //for sending Message

    // whatsAppSend("Testing api")

    const response:any = await EmailRead();

    const { parsedEmails } = response;




    // const  chatgptAsnwer = await ChatGpt(parsedEmails[parsedEmails.length - 1], "find the important details");

    // console.log({ chatgptAsnwer });
    // console.log(parsedEmails[parsedEmails.length - 1].TextBody);
    // console.log({ response });

    const chatgptAsnwer =
      await ChatGpt(`Can you please provide important details for event or task for blocking the calendar event? bidercate it into "Event Name",
                "Event Date" and "Amount" in an object by sereated eventName,date and amount ${parsedEmails[parsedEmails.length - 1].TextBody}`);
    // console.log({ chatgptAsnwer });
    // console.log(typeof chatgptAsnwer );

    // const finalMessage = "Alert : "+chatgptAsnwer
    const finalMessage = removeUnwanted(chatgptAsnwer)




    

    // console.log(finalMessage);
    // console.log(typeof finalMessage);


    // finalMessage && res.status(200).json({ message: "This is a GET request", emailResponse: finalMessage });
    // const FinalMessge = {
    //   Reminder: chatgptAsnwer,
    // };


    finalMessage &&
      whatsAppSend(finalMessage).then(() => {
        res.status(200).json({ message: "Chat gpt Answer sended" });
      });

    // response && res.status(200).json({ message: "This is a GET request", emailResponse: response });
  } else if (req.method === "POST") {
   
  } else {
  res.status(405).json({ message: "Method Not Allowed" });
  }
}
