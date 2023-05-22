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


    // console.log(response.data.choices[0]);
    // console.log(JSON.parse(response.data.choices[0].message.content));

    // const parsedData = JSON.parse(response.data.choices[0].message.content);


    //         //  let myobject = JSON.parse(ChatGptResponse);

    //          const keys = Object.keys(parsedData);
    //          console.log(typeof parsedData);
           
    //          const eName = keys.filter((element) => element.toLowerCase().includes("name"));
    //          const eAmount = keys.filter((element) => element.toLowerCase().includes("amount"));
    //          const eDate = keys.filter((element) => element.toLowerCase().includes("date"));

    //           console.log({ eName, eAmount, eDate });





    const answer = response.data.choices[0].message.content;


    return answer;
   
  } catch (error) {
    console.error('Error:', error);
 
}


//   return data;
}
