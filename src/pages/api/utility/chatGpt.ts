import axios from "axios";

import config from '../../../services/config'
const OPENAI_API_KEY = config.openAiApiKey;
export default async function ChatGpt(query:any) {


    
  try {


    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: query }]
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    ).catch((error)=>{
        throw new Error(error.response.data.error.message)
      
        })


    const answer = response.data.choices[0].message.content;

    console.log(answer);


    return answer;
   
  } catch (error) {
    console.error('Error in Chat gpt:', error);

    // throw new Error(error)

}
}

