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



     if (req.method === "GET") {
       res.status(200).json({ message: "This is a GET request" });
     } else if (req.method === "POST") {

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

  const {accessToken} = req.body;

  // res.send(accessToken)



  // imap creditiantials for connection
  const imap = new Imap({
    user: "testemail@endlos.cloud",
    password: "Testemail@12345",
    host: "endlos.cloud",
    port: 143,

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

      // // Set search criteria (optional)
      // const searchCriteria = ["ALL"];
      const searchCriteria = ["UNSEEN"];

      // Set search criteria to fetch emails sorted by date in descending order
      // const searchCriteria = ["ALL", ["SORT", "DATE", "REVERSE"]];

      imap.search(searchCriteria, function (err: any, results: any) {
        if (err) {
          console.error(err);
          res.status(200).json({ message: err });
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

              // console.log({parsed});

              //                      const  attachmentData2 = parsed.attachments.forEach((attachment:any, index:number) => {
              //             const attachmentData = attachment.content.toString('utf-8');
              //             console.log(attachmentData);

              //   return attachmentData;
              // });

              const emailObject = {
                From: parsed.from.text,
                Subject: parsed.subject,
                TextBody: parsed.text.replace("\n", " "),
                // "HTML body": parsed.html,

                // parsed: "attachmentData2",
              };

              // console.log({ Subject: emailObject.Subject });

              //temp for video making code

              // console.log(emailObject?.TextBody);
              // const ChatGptResponse =
              //   await ChatGpt(`Can you please provide important details for event or task for blocking the calendar event? bidercate it into "Event Name",
              //   "Event Date" and "Amount" in an object by sereated eventName,date and amount ${emailObject?.TextBody}`);
              // const ChatGptResponse = await ChatGpt(
              //   `${emailObject?.TextBody} Can you help me search for specific data from a text? I have a text  that contains information about bill or invoices, and I need to extract details such as the event Name, amount, and due date. How can I retrieve this information from the text using your assistance? `
              // );

              // console.log(ChatGptResponse);

              const ChatGptResponse =
                await ChatGpt(`Can you please provide important details for event or task for blocking the calendar event? bidercate it into "Event Name",
                "Event Date" and "Amount" in an object by sereated eventName,date and amount ${emailObject?.TextBody}`);

              // console.log(typeof ChatGptResponse);

              // const splited = ChatGptResponse.split(':')

              // console.log({ splited });
              // console.log({ ChatGptResponse });

              // let myobject = JSON.parse(ChatGptResponse);

              // console.log({ ChatGptResponse });

              // const keys = Object.keys(myobject);
              // console.log(typeof myobject);
              // console.log(keys);
              // // console.log(keys[0]);

              // // console.log({ first: myobject[keys[0]] });

              // const eName = keys.filter((element) => element.toLowerCase().includes("name"));
              // const eAmount = keys.filter((element) => element.toLowerCase().includes("amount"));
              // const eDate = keys.filter((element) => element.toLowerCase().includes("date"));

              // console.log({ eName, eAmount, eDate });

              // const dueDate = await ChatGpt(`Can you please provide me given date in DD/MM/YYYY Formet only give me one date ${myobject[eDate[0]]}`);

              // console.log({ dueDate });
              // console.log({ eventData: myobject[eDate[0]] });
              // // const mydueDate = new Date(dueDate);

              // const inputDate = dueDate;
              // const [day, month, year] = inputDate.split("/");
              // const formattedDate = new Date(`${year}-${month}-${day}`);
              // const mydueDate = formattedDate.toISOString();

              // console.log({ mydueDate });

              // //end Date

              // const isoDate = new Date(`${year}-${month}-${day}T01:00:00`);
              // const formattedDate2 = new Date(`${year}-${month}-${day}T01:00:00`);
              // const isoDate2 = formattedDate2.toISOString();
              // const endDate = isoDate.toISOString();

              // console.log({ isoDate2 });
              // console.log({ endDate });

              // console.log(isoDate);

              // const EventName = myobject[eName[0]];

              // console.log({EventName});

              // keys.map(element=>
              //   {

              // element.toLowerCase().includes('event name')
              // element.toLowerCase().includes("event date");
              // element.toLowerCase().includes("amount");

              //   })

              // const EventInfomation = {
              //   Summary: myobject[eName[0]],
              //   //  Summary: emailArray[emailArray.length - 1]?.Subject,
              //   DueAmount: myobject[eAmount[0]],
              //   // DueDate: object["Due Date"],
              //   DueDate: mydueDate,
              // };
              const EventInfomation = {
                Summary: "Plastics Recycling Show Middle East & Africa (PRS ME&A)",

                DueAmount: "$473",
                // DueDate: object["Due Date"],
                DueDate: "2023-09-17T00:00:00.000Z",
              };

              //setting event to the google calender

              const gcResponse:any = await googleCalendar(EventInfomation, accessToken);

              console.log({ gcResponse });
              //  res.send({emailResponse:EventInfomation})
              // res.send({ error: gcResponse });

              if (gcResponse?.status == "confirmed") {
                res.status(200).json({
                  status: true,
                  emailResponse: gcResponse,
                });
              }
              if (emailArray.length === results.length) {
                //  console.log({ summ: myobject[eName[0]] });
                //  console.log({EventInfomation});

                // res.status(200).json({
                //   emailResponse: "emailArray",
                // });

                // console.log(myobject[keys[0]]);
                // console.log(keys[keys.length-1]);
                // console.log(typeof keys);
                // console.log(typeof myobject);

                // const DueDate = await ChatGpt(`give it in DD/MM/YYYY formet  ${myobject[keys[keys.length - 1]]}`);

                //  console.log({DueDate} );

                //  const EventInfomation = {
                //    Summary: "Hitesh Endlos Event Generation Automation",
                //    //  Summary: emailArray[emailArray.length - 1]?.Subject,
                //    DueAmount: myobject[keys[1]],
                //    // DueDate: object["Due Date"],
                //    DueDate: dueDate.toISOString(),
                //  };

                //  console.log({ data:myobject[keys[0]] });

                //  console.log(object);
                //  console.log(object["Due Date"]);
                //  console.log(object["Amount Due"]);
                //  console.log(ChatGptResponse.Duedate);
                //  console.log(typeof ChatGptResponse)

                // emailArray.push(emailObject.Subject);

                // Check if all emails are parsed
                //Finding the Due date and other things from email

                //  console.log(await ChatGpt(`Find due Amount And Due data in it ? ${emailArray[emailArray.length-1]?.TextBody}`));

                // console.log("Checking the Email body is present or not ");

                // console.log(emailArray[emailArray.length-1]?.TextBody);
                // console.log(emailArray.length-1);
                // console.log(emailArray[0]?.TextBody);

                // const filterdData = await emailArray.filter((e) => e.Subject == "Billing invoice");
                // const filterdData = await emailArray.filter((e) => e.Subject == "Plastic Recycling Show - Middle East & Africa");
                // console.log(filterdData);

                // res.send(filterdData)

                // res.status(200).json({
                //   emailResponse: emailArray,
                // });

                // console.log("before");
                // console.log(await ChatGpt(`Find due Amount And Due data in it ? ${filterdData[0]?.TextBody}`));
                // console.log("After");

                console.log(emailArray[emailArray.length - 1]?.TextBody);
                const ChatGptResponse =
                  await ChatGpt(`Can you please provide important details for event or task for blocking the calendar event? bidercate it into "Event Name",
                "Event Date" and "Amount" ${emailArray[emailArray.length - 1]?.TextBody}`);

                console.log(ChatGptResponse);

                //  console.log(JSON.parse(ChatGptResponse));
                //  console.log(typeof JSON.parse(ChatGptResponse));

                //  let myobject = JSON.parse(ChatGptResponse)

                //  const keys = Object.keys(myobject);

                //  console.log({ data:myobject[keys[0]] });

                //  console.log(object);
                //  console.log(object["Due Date"]);
                //  console.log(object["Amount Due"]);
                //  console.log(ChatGptResponse.Duedate);
                //  console.log(typeof ChatGptResponse)

                //  const dueDate = new Date( object["Due Date"]);
                //  const dueDate = new Date(myobject[keys[0]]);

                //  console.log({ dueDate });
                //  console.log({ dueDateConverte: dueDate.toISOString() });

                // //  console.log({dueDate});

                //  const EventInfomation = {
                //    Summary: "Hitesh Endlos Event Generation Automation",
                //    //  Summary: emailArray[emailArray.length - 1]?.Subject,
                //    DueAmount: myobject[keys[1]],
                //    // DueDate: object["Due Date"],
                //    DueDate: dueDate.toISOString(),
                //  };

                //    const ChatGptResponse2 = await ChatGpt(
                //      `convert the duedate in iso  date formet formet and return the same object in the same form   ? ${EventInfomation.DueDate}`
                //    );
                //  console.log({ ChatGptResponse2 });

                //setting event to the google calender

                // googleCalendar("EventInfomation", accessToken);

                // All emails are parsed, send the array as a response
                // res.status(200).json({
                //   emailResponse: emailArray,
                // });
              }
            } catch (err) {

              console.log("first error block");
              // console.error(err.message);


res.status(500).json({ status: false, error: err });

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


    
     } else {
       // Handle other HTTP methods
       res.status(405).json({ message: "Method Not Allowed" });
     }




}


   




