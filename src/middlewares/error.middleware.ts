import { NextFunction, Request, Response } from "express";

export const genericErrorHandler = (err : any , req:Request , res : Response , next : NextFunction) =>{

    console.log("error parameters is " , err);
    
    res.status(501).json({
        success: false,
        message: "something went wrong !!!"
    })
}