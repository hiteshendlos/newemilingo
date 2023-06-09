import axios from "axios";

const OPENAI_API_KEY = "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";

export default async function ChatGpt(query: any) {


    
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
    );


    const answer = response.data.choices[0].message.content;


    return answer;
   
  } catch (error) {
    console.error('Error:', error);
 
}


//   return data;
}


