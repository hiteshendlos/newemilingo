import type { NextApiRequest, NextApiResponse } from "next";

import User from "@/models/user";
import BcryptHelper from "@/services/helpers/Bcrypt";

import { connectToMongo } from "@/services/utility/db";

type DataType = {
  status?: boolean;
message?: any;
 error?: any;
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 if (req.method === "GET") {



    try {


      const  {type}= req.query;

      await connectToMongo()

      if(type=="all"){

        const users = await User.find({})
        res.status(200).json({
          message:"All User",
          users,
         
      })

      }

  
 
      
    } catch (error) {
      
    }
   
 

   
  } else {
  res.status(405).json({ message: "Method Not Allowed" });
  }
}
