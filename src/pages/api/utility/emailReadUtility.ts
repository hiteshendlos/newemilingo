const Imap = require("imap");

const util = require("util");
const simpleParser = util.promisify(require("mailparser").simpleParser);

type DataType = {
  status?: boolean;
  msg?: any[];
  message?: string;
  emailResponse?: {};
  error?: any;
};

 const unseenEmails:any = [];

function parseEmails() {
  return new Promise((resolve, reject) => {
    const unseenEmails = [];

    const imap = createImapConnection();
    imap.once("ready", () => {
      openInbox(imap, (err:any, box:any) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        searchUnseenEmails(imap)
          .then((results) => fetchAndParseEmails(imap, results))
          .then((parsedEmails) => {
            imap.end();
            // resolve({ unseenEmails, parsedEmails });
            resolve({ parsedEmails });
          })
          .catch((err) => {
            console.error("Error while parsing emails:", err);
            imap.end();
            reject(err);
          });
      });
    });

    imap.once("error", (err:any) => {
      console.error("IMAP error:", err);
      reject(err);
    });

    imap.connect();
  });
}

function createImapConnection() {
  return new Imap({
    user: "testemail@endlos.cloud",
    password: "Testemail@12345",
    host: "endlos.cloud",
    port: 143,
  });
}

function openInbox(imap:any, callback:any) {
  imap.openBox("INBOX", true, callback);
}

function searchUnseenEmails(imap:any) {
  return new Promise((resolve, reject) => {
    imap.search(["UNSEEN"], (err:any, results:any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

function fetchAndParseEmails(imap:any, results:any) {
  const fetchOptions = {
    bodies: "",
    markSeen: false,
  };
  const unseenEmails:any = [];
  const parsingPromises:any = [];

  const fetch = imap.fetch(results, fetchOptions);

  fetch.on("message", (msg:any, seqno:any) => {
    const parsingPromise = new Promise((resolve, reject) => {
      msg.on("body", async (stream:any, info:any) => {
        try {
          const parsed = await simpleParser(stream);
          const emailObject = {
            From: parsed.from.text,
            Subject: parsed.subject,
            TextBody: parsed.text.replace("\n", " "),
          };
          unseenEmails.push(emailObject);
          resolve(emailObject);
        } catch (err) {
          console.error("Error while parsing email:", err);
          reject(err);
        }
      });
    });

    parsingPromises.push(parsingPromise);
  });

  return new Promise((resolve, reject) => {
    fetch.once("error", (err:any) => {
      console.error("Fetch error:", err);
      reject(err);
    });

    fetch.once("end", () => {
      console.log("All emails read");

      Promise.all(parsingPromises)
        .then((parsedEmails) => {
          resolve(parsedEmails);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}





export default async function EmailRead() {
 
    try {
     

      const Emails = parseEmails()
        .then((unseenEmails) => {


          // console.log("Unseen emails final when calling the function:", unseenEmails);
          return unseenEmails;
    })
        .catch((error) => {
          console.error("Error while reading emails:", error);
        });


        return Emails

      
    } catch (error) {
      
    }
   
}
