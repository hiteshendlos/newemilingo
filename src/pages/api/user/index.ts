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

    
   
    res.status(200).json({
        message:"User API",
        
    })

   
  } else {
  res.status(405).json({ message: "Method Not Allowed" });
  }
}
