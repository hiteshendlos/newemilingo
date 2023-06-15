import axios from "axios";
import config from "../../../services/config";


export default async function whatsAppSend(body: any,mobile:any) {
  try {
const  apiurl=config.ultrMsgApi
const token:string = config.ultrMsgToken ?? '';
const senderNumber = mobile;

const data = new URLSearchParams();
data.append("token", token);
data.append("to", senderNumber);
data.append("body", body);

const axiosconfig = {
  method: "post",
  url: apiurl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  data: data,
};

const response = axios(axiosconfig)
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
