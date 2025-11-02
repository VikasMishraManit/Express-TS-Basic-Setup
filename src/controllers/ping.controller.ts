import { Request, Response } from  "express";

export const pingHandler = (req : Request , res: Response) =>{
  console.log("req body is " , req.body);
  console.log("req query is " , req.query);
  console.log("req query is " , req.params);
  
  res.send('Pong');
}