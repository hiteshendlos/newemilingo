import type { NextApiRequest, NextApiResponse } from "next";
const Imap = require("imap");

const util = require("util");
const simpleParser = util.promisify(require("mailparser").simpleParser);
// const simpleParser = require("mailparser").simpleParser;
type DataType = {
  status?: boolean;
  msg?: any[];
  message?: string;
  emailResponse?: {};
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<DataType>) {
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

  function openInbox(callback: any) {
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

      const Result = await imap.search(searchCriteria, function (err: any, results: any) {
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
            //       simpleParser(stream, (err: any, parsed: any) => {
            //         if (err) throw err;

            //         //  console.log("Email " + seqno + ":");
            //         //  console.log("From: " + parsed.from.text);
            //         //  console.log("Subject: " + parsed.subject);
            //         //  console.log("Text body: " + parsed.text);
            //         //  console.log("HTML body: " + parsed.html);

            // const emailObject = {
            //   From: parsed.from.text,
            //   Subject: parsed.subject,
            //   TextBody: parsed.text.replace("\n", " "),
            //   "HTML body": parsed.html,
            // };

            // emailArray2.push(emailObject); // Push the parsed email object to the array

            // console.log(emailArray);

            //         // emailArray2.push({
            //         //   From: parsed.from.text,
            //         //   Subject: parsed.subject,
            //         //   TextBody: parsed.text.replace("\n", " "),
            //         //   "HTML body": parsed.html,
            //         // });

            //         return { from: parsed.from.text };

            //         res.status(200).json({
            //           emailResponse: {
            //             From: parsed.from.text,
            //             Subject: parsed.subject,
            //             TextBody: parsed.text.replace("\n", " "),
            //             "HTML body": parsed.html,
            //           },
            //         });
            //         return {
            //           emailResponse: {
            //             From: parsed.from.text,
            //             Subject: parsed.subject,
            //             TextBody: parsed.text.replace("\n", " "),
            //             "HTML body": parsed.html,
            //           },
            //         };

            //         // Do further processing with the parsed email contents

            //         // Mark the email as seen (optional)
            //         //  imap.addFlags(seqno, "\\Seen");
            //       });

            const parsedEmailCustom = await simpleParser(stream)
              .then((parsed: any) => {
                const emailObject = {
                  From: parsed.from.text,
                  Subject: parsed.subject,
                  TextBody: parsed.text.replace("\n", " "),
                  "HTML body": parsed.html,
                };

                return emailObject;
              })
              .catch((err: any) => {
                // Error handling
                console.error(err);
              });

            console.log({ parsedEmailCustom });

            res.status(200).json({
              msg: parsedEmailCustom,
              // message:"hello"
            });
          });
        });

        fetch.once("error", function (err: any) {
          console.error(err);
        });

        fetch.once("end", function () {
          imap.end();
        });
      });

      console.log({ Result });

      // // Check if all emails are parsed and stored
      // if (emailArray.length === Result.length) {
      //   // Send the response with the emailArray
      //   // res.status(200).json({ emailArray });
      //   res.status(200).json({
      //     msg: emailArray,
      //   });
      // }
    });
  });

  imap.connect();
}
