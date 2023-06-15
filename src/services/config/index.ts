const config = {

    //db config 
    databaseURL: process.env.MONGODB_URI,

    //jwt config
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,

    // Opena Ai config
    openAiApiKey:process.env.OPENAI,

    //Ultra Msg config 
    ultrMsgApi:process.env.ULTRAMSG_API,
    ultrMsgToken:process.env.ULTRAMSG_TOKEN,
  };
  
  export default config;
  