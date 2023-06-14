import type { NextApiRequest, NextApiResponse } from "next";

import User from "@/models/user";
import BcryptHelper from "@/services/helpers/Bcrypt";
import { connectToMongo } from "@/services/utility/db";
import mongoose from "mongoose";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 if (req.method === "PUT") {




  try {
    await connectToMongo()


    const {id}= req.query;

    const {gAccesstoken,gRfreshtoken,subject,body}=req.body

    if(id){
      const isExist = await User.findById({_id:new mongoose.Types.ObjectId(id.toString())})

      if(!isExist){
          res.status(409).json({error:"User Not Exist"})
      }

  const user = await User.findOneAndUpdate(
    
    //  { _id:  new mongoose.Types.ObjectId(id.toString()) }, 
{ _id:  new mongoose.Types.ObjectId(id.toString()) }, 
    {
      "authorization.gRfreshtoken": gRfreshtoken,
      "authorization.gAccesstoken": gAccesstoken,
      "lstmsgData.subject": subject,
      "lstmsgData.body": body,

    },
    { new: true }
  );
  res.status(200).json({
      message:"User Updated Succesfully",
      user
  })


    }
  } catch (error) {

    res.status(404).json({
      message:error,

  })
    
  }

  


        

   
  } else {
  res.status(405).json({ message: "Method Not Allowed" });
  }
}
