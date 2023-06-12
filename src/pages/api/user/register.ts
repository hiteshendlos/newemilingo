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
 if (req.method === "POST") {

  try {

    await connectToMongo()



    const isExist = await User.findOne({email:req.body.email})

    if(isExist){
        res.status(409).json({error:"User Already Registerd"})
    }else{
      const enpasscode= await BcryptHelper.generateHash(req.body.password)

      const user  = await  User.create({
      ...req.body,
     "authorization.password":enpasscode,
     "authorization.gAccesstoken":enpasscode
  
  })
  
  res.status(200).json({
      message:"User Regiterd Succesfully",
      user
  })

    }

    
  } catch (error) {

    res.status(200).json({
      error,
      
  })


    
  }

      

   
  } else {
  res.status(405).json({ message: "Method Not Allowed" });
  }
}
