import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";

export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {
  
  try{
 await fs.readFile("sample")
 res.status(200).json({message : "pong"});
  } catch(error){
    // since express already calls the next function
    next(error)
  }
};
