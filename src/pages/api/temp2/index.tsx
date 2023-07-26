import type { NextApiRequest, NextApiResponse } from "next";
import ChatGpt from "../utility/chatGpt";
import { connectToGmailImap } from "../utility/imapConnect";

const Imap = require("imap");

const util = require("util");
const simpleParser = util.promisify(require("mailparser").simpleParser);
type DataType = {
  status?: boolean;
  msg?: any;
  message?: string;
  emailResponse?: {};
  error?: any;
};










const imap = new Imap({
    user: 'testemail@endlos.cloud',
    password: 'Testemail@12345',
    host: 'endlos.cloud',
    port: 143,
  });
  
  // Function to open the inbox
  const openInbox = () => {
    return new Promise((resolve, reject) => {
      imap.openBox('INBOX', true, (err:any, box:any) => {
        if (err) {
          reject(err);
        } else {
          resolve(box);
        }
      });
    });
  };
  
  // Function to fetch all messages
  const fetchAllMessages = (searchCriteria:any) => {

    console.log("fetch all message",searchCriteria)
    return new Promise((resolve, reject) => {
      imap.search(searchCriteria, (err:any, results:any) => {
        if (err) {
          reject(err);
        } else {
          const fetchOptions = {
            bodies: '',
            markSeen: false,
            // struct: true,
            // reverse: true,
          };
  
          const fetch = imap.fetch(results, fetchOptions);
          const emailArray:any = [];

          const NowTime = Date.now()
  
          fetch.on('message', (msg:any, seqno:any) => {

         
            msg.on('body', async (stream:any, info:any) => {
              try {
                const parsed = await simpleParser(stream);
  
                const emailObject = {
                  From: parsed.from.text,
                  Subject: parsed.subject,
                  TextBody: parsed.text.replace('\n', ' '),
                  // Include other fields as needed
                };

                
  console.log(NowTime-Date.now(),{emailObject})
              await  emailArray.push(emailObject);
              

                console.log({emailArray})
              } catch (err) {
                console.error(err);
              }
            });

            msg.on('end', () => {
                console.log('Finished processing email message.');
                // You can perform additional actions here if needed when the message is fully processed.
              });   
          });
  
          fetch.once('error', (err:any) => {
            reject(err);
          });
  
          fetch.once('end', () => {
              console.log(NowTime-Date.now(),{emailArray})
            resolve(emailArray);
            
          });
        }
      });
    });
  };
  
  // Function to connect to the IMAP server
  const connectToImap = () :Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      imap.once('ready', () => {
        resolve();
      });
  
      imap.once('error', (err:any) => {
        reject(err);
      });
  
      imap.connect();
    });
  };
  
  // Function to handle the entire process
  const getEmailData = async (searchCriteria:any) => {
    try {
      await connectToImap();
      await openInbox();
      const emailArray = await fetchAllMessages(searchCriteria);
  
      imap.end();
  
      return emailArray;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  


export default async function handler(req: NextApiRequest, res: NextApiResponse<DataType>) {
  try {

    connectToGmailImap()


        res.status(200).json({ msg: "out" });
    } catch (error) {
      res.status(401).json({ message: "Internal Error" });
  }
}
