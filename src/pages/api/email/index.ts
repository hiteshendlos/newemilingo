import type { NextApiRequest, NextApiResponse } from "next";
import ChatGpt from "../utility/chatGpt";
import googleCalendar from "../utility/googleCalendar";
const Imap = require("imap");
import tls from 'tls';

const util = require("util");
const simpleParser = util.promisify(require("mailparser").simpleParser);
// const simpleParser = require("mailparser").simpleParser;
type DataType = {
  status?: boolean;
  msg?: any[];
  message?:string;
  emailResponse?:{};
  error?:any;
};



export default async function handler(req: NextApiRequest, res: NextApiResponse<DataType>) {



     if (req.method === "POST") {
       return res.status(200).json({ message: "This is a GET request" });
     } else if (req.method === "GET") {
      
try {



  const {accessToken} = req.body;

  // imap creditiantials for connection
  // const imap = new Imap({
  //   user: "testemail@endlos.cloud",
  //   password: "Testemail@12345",
  //   host: "endlos.cloud",
  //   port: 143,

  // });




  // for info@endlos.in

  const imap = new Imap({
    user: "info@endlos.in",
    password: "ufxfsztcqmpkwebf",
    host: 'imap.gmail.com',
    port: 993,
    // password: "Endlos@12345p",
    // host: "imap.gmail.com",
    // port: 993,

    // tls: true,
    // tlsOptions: { rejectUnauthorized: false }

  });

  


  const emailArray:any = [];

  const  openInbox =(callback: any)=> {
    imap.openBox("INBOX", true, callback);
  }

  imap.once("ready", function () {
    openInbox(async function (err: any, box: any) {
      if (err) {
        console.error(err);
        return;
      }

      // Set search criteria (optional)
      // const searchCriteria = ["ALL"];


      const searchCriteria = ["UNSEEN"];

      // Set search criteria to fetch emails sorted by date in descending order
      // const searchCriteria = ["ALL", ["SORT", "DATE", "REVERSE"]];



      imap.search(searchCriteria, function (err: any, results: any) {
        if (err) {
          console.error(err);
          return res.status(200).json({ message: err });
          return;
        }

        const fetchOptions = {
          bodies: "",
          markSeen: false,
          // struct: true,
          // reverse: true, // Fetch emails in reverse order (latest first)
        };
        const fetch = imap.fetch(results, fetchOptions);

        fetch.on("message", function (msg: any, seqno: any) {
          msg.on("body", async function (stream: any, info: any) {
            try {
              const parsed = await simpleParser(stream);

       

              const emailObject = {
                From: parsed.from.text,
                Subject: parsed.subject,
                TextBody: parsed.text.replace("\n", " "),


                // "HTML body": parsed.html,

                // parsed: "attachmentData2",


              };

              const ChatGptResponse =
                await ChatGpt(`Can you please provide important details for event or task for blocking the calendar event? bidercate it into "Event Name",
                "Event Date" and "Amount" in an object by sereated eventName,date and amount ${emailObject?.TextBody}`);

        
              const EventInfomation = {
                Summary: "Plastics Recycling Show Middle East & Africa (PRS ME&A)",

                DueAmount: "$473",
                // DueDate: object["Due Date"],
                DueDate: "2023-09-17T00:00:00.000Z",
              };

              //setting event to the google calender

              const gcResponse:any = await googleCalendar(EventInfomation, accessToken);

              console.log({ gcResponse });
        

              if (gcResponse?.status == "confirmed") {
                return res.status(200).json({
                  status: true,
                  emailResponse: gcResponse,
                });
              }
              if (emailArray.length === results.length) {
            
                console.log(emailArray[emailArray.length - 1]?.TextBody);
                const ChatGptResponse =
                  await ChatGpt(`Can you please provide important details for event or task for blocking the calendar event? bidercate it into "Event Name",
                "Event Date" and "Amount" ${emailArray[emailArray.length - 1]?.TextBody}`);

                console.log(ChatGptResponse);

        
                res.status(200).json({
                  emailResponse: emailArray,
                });
              }
            } catch (err) {

              console.log("first error block");
              // console.error(err.message);


return res.status(500).json({ status: false, error: err });

            }
          });
        });

        fetch.once("error", function (err: any) {
          console.error(err);
        });

        fetch.once("end", function () {
          console.log("imap end");
          imap.end();
        });
      });
    });
  });

  imap.connect();
} catch (error) {

  return res.status(401).json({message:"Internal Error"})
  


}


    
     } else {
       // Handle other HTTP methods
       return res.status(405).json({ message: "Method Not Allowed" });
     }




}


   




