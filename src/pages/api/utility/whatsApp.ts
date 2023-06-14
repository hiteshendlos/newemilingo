import axios from "axios";


export default async function whatsAppSend(body: any,mobile:any) {
  try {

    
// const apiUrl = process.env.UTLTRAMSG_API_URL;
// const ultramsg_token = process.env.UTLTRAMSG_TOKEN;
// const senderNumber:string|undefined = process.env.WHATSAPP_SENDER_NUMBER;
const  apiurl=" https://api.ultramsg.com/instance50797/messages/chat"
const token = 'naooj7k9rul267wn';
// const senderNumber = "8740093482";
const senderNumber = mobile;

    // console.log({body});
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
  .then((response:any) => {
    
    console.log(response.data)
    

    return response
    })
  .catch((error:any) => console.log("error", error));

  return response;  

 
  } catch (error) {
    console.error("Error:", error);
  }

}
