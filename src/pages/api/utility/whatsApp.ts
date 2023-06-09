import axios from "axios";


export default async function whatsAppSend(body: any) {
  try {

    
// const apiUrl = process.env.UTLTRAMSG_API_URL;
// const ultramsg_token = process.env.UTLTRAMSG_TOKEN;
// const senderNumber:string|undefined = process.env.WHATSAPP_SENDER_NUMBER;
const  apiurl=" https://api.ultramsg.com/instance50201/messages/chat"
const token = 'nx2s1g2id1z4z79k';
const senderNumber = "8740093482";

    console.log({body});
const data = new URLSearchParams();
data.append("token", token);
data.append("to", senderNumber);
data.append("body", body);

const config = {
  method: "post",
  url: apiurl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  data: data,
};

const response = axios(config)
  .then((response) => console.log(response.data))
  .catch((error) => console.log("error", error));

   

    // const answer = response.data.choices[0].message.content;

    // return answer;
  } catch (error) {
    console.error("Error:", error);
  }

  //   return data;
}
