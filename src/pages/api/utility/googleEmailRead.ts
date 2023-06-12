const { google } = require("googleapis");

// Set up OAuth2 client with your access token
const accessToken = 'ya29.a0AWY7CknAixvF8EtNE2Mk2jldDawQTryxGIVuB6qX1GUmNWWPCOULoKE8P_iDLkV12tp-HlQ035ZqYFwwpf4j1HJ6h7lBS6S_lNbskxt2J_D1K64Y3O39pmqAYMeLlnIAOGjxxiN49kuCrAVeKdQmp_V8yAtUaCgYKAXASARMSFQG1tDrpKCUy0_JLUuCvzxsZ_6io5A0163';
const oauth2Client = new google.auth.OAuth2();
oauth2Client.setCredentials({ access_token: accessToken });

// Create Gmail API client
const gmail = google.gmail({ version: "v1", auth: oauth2Client });


interface EmailHeader {
    name: string;
    value: string;
  }



  // Helper function to extract email body from payload recursively
function getEmailBody(payload:any) {
    let body = "";
  
    if (payload.parts) {
      for (let part of payload.parts) {
        if (part.mimeType === "text/plain") {
          body += Buffer.from(part.body.data, "base64").toString("utf-8");
        } else if (part.mimeType === "multipart/alternative") {
          body += getEmailBody(part);
        }
      }
    }
  
    return body;
  }

// Fetch all emails
async function fetchGoogleEmails() {
  try {
    // Calculate the timestamp for 10 minutes ago
    const tenMinutesAgo = new Date();
    tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 50);
    const formattedTime = tenMinutesAgo.toISOString();

    // const res = await gmail.users.messages.list({
    //   userId: "me",
    //   q: `after:${formattedTime}`,
    // });

    const res = await gmail.users.messages.list({
        userId: "me",
        // q: `after:${formattedTime}`,
        maxResults: 1,
      });
  

    // //   console.log({res});
    //   console.log({formattedTime});

    //   console.log({data:res});

    // const messages = res.data.messages;
    // console.log("email");
    // if (messages) {
    //   for (let i = 0; i < messages.length; i++) {
    //     const message = messages[i];
    //     const emailRes = await gmail.users.messages.get({
    //       userId: "me",
    //       id: message.id,
    //       format: "full",
    //     });
    //     const email = emailRes.data;
    //     // Process the email as needed
    //     console.log(typeof email);
    //     console.log("email");

    //     return email;
    //   }
    // }

    let returnObj;

    const messages = res.data.messages;
    if (messages && messages.length > 0) {
      const latestMessageId = messages[0].id;
      const emailRes = await gmail.users.messages.get({
        userId: "me",
        id: latestMessageId,
        // format: "metadata",
        format: "full",
        metadataHeaders: ["Subject"],
      });


      const email = emailRes.data;
      const headers = email.payload.headers;
      const subject = headers.find((header:EmailHeader) => header.name === "Subject").value;
      const body = getEmailBody(email.payload);

    //   const email = emailRes.data;
    //   const headers = email.payload.headers;
    // const subject = headers.find((header: EmailHeader) => header?.name === "Subject")?.value;
    //   const bodyText = email.snippet;

    //   console.log("Subject:", subject);
    //   console.log("Body Text:", bodyText);

      returnObj={
        subject,
        body,
        // email
      }
    }
      return returnObj
      
  } catch (error) {
    console.error("Error fetching emails:", error);
  }
}


export default fetchGoogleEmails;
