import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";

const validateRequestBody = (schema: ZodObject<ZodRawShape>) => {
   return  async (req: Request , res : Response , next : NextFunction)=>{
    try{
      await schema.parseAsync(req.body);
      console.log("request  body is valid");
      next();
      
    }
    catch(err){
      // if the validation fails
      return ; 
    }
   }
};

export default validateRequestBody;
