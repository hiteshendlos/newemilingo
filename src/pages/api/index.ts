import type { NextApiRequest, NextApiResponse } from "next";
type DataType = {
    status?: boolean;
    message?: string;
    error?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<DataType>) {
  try {

    res.status(200).json({
        status:true,
        message:"Welcome to our App"
    })
   
  } catch (error) {
    res.status(401).json({ status:false,error:error });
  }
}
