import type { NextApiRequest, NextApiResponse } from "next";
import ChatGpt from "../utility/chatGpt";
import googleCalendar from "../utility/googleCalendar";
const Imap = require("imap");

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



try {
  // const imap = new Imap({
  //   user: "hitesh.endlos@gmail.com",
  //   password: "Allinone@12",
  //   host: "imap.gmail.com",
  //   port: 993,
  //   tls: true,
  //   tlsOptions: {
  //     rejectUnauthorized: false,
  //   },
  // });

  // imap creditiantials for connection
  const imap = new Imap({
    user: "testemail@endlos.cloud",
    password: "Testemail@12345",
    host: "endlos.cloud",
    port: 143,
    // tls: true,
    // tlsOptions: {
    //   rejectUnauthorized: false,
    // },
  });

  const emailArray: {}[] = [];

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
      const searchCriteria = ["ALL"];

      imap.search(searchCriteria, function (err: any, results: any) {
        if (err) {
          console.error(err);
          res.status(200).json({ message: err });
          return;
        }

        const fetchOptions = {
          bodies: "",
          markSeen: false,
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
              };

              emailArray.push(emailObject);

              // Check if all emails are parsed
              if (emailArray.length === results.length) {


                
// console.log(emailArray[0].TextBody);

                   

                   console.log(await ChatGpt(`Find due Amount And Due data in it ? ${emailArray[emailArray.length-1]?.TextBody}`));

googleCalendar("hello")


                // All emails are parsed, send the array as a response
                res.status(200).json({
                  emailResponse: emailArray,
                });
              }
            } catch (err) {
              console.error(err);
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

  res.status(401).json({message:"Internal Error"})
  
}


   



}
