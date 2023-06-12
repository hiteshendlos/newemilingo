import type { NextApiRequest, NextApiResponse } from "next";

import BcryptHelper from "@/services/helpers/Bcrypt";
import User from "@/models/user";
import JwtHelper from "@/services/helpers/JwtHelper";
import { connectToMongo } from "@/services/utility/db";


type DataType = {
  status?: boolean;
message?: any;
 error?: any;
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // await connectToMongo()

    res.send("user get api is done")
   
  } else if (req.method === "POST") {
    await connectToMongo()

    const {email,password} =req.body;

    const user = await User.findOne({email})

    if(user){

        const checkPass= await BcryptHelper.comparePassword(password,user.authorization.password)

        if(!checkPass){
            res.status(401).json({
                error:"Please Login with valid creditionals",
                
            })

        }else{


            const userDetails= {
                name:user.name,
                email:user.email,

            }
const token = await JwtHelper.generateTokens(userDetails)

            res.status(200).json({
                message:"Successfully Login",
                token,
               user
                
            })

        }
    
        
    }else{

        res.status(401).json({
            error:"Please Login with valid creditionals",
            
        })
    
    }


    

    //     const user  = await  User.create({
    //     ...req.body,
    //    "authorization.password":enpasscode,
    //    "authorization.gAccesstoken":enpasscode

    // })

   
    
   
  } else {
  res.status(405).json({ message: "Method Not Allowed" });
  }
}
