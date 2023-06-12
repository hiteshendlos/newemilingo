import type { NextApiRequest, NextApiResponse } from "next";

import User from "@/models/user";
import BcryptHelper from "@/services/helpers/Bcrypt";
import { connectToMongo } from "@/services/utility/db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 if (req.method === "PUT") {

        await connectToMongo()



        const isExist = await User.findOne({email:req.body.email})

        if(isExist){
            res.status(409).json({error:"User Not Exist"})
        }


       const enpasscode= await BcryptHelper.generateHash(req.body.password)

        const user  = await  User.findOneAndUpdate({
        ...req.body,
       "authorization.password":enpasscode,
       "authorization.gAccesstoken":enpasscode

    })
   
    res.status(200).json({
        message:"User Updated Succesfully",
        user
    })

   
  } else {
  res.status(405).json({ message: "Method Not Allowed" });
  }
}
