import express, { NextFunction, Request, Response } from 'express';
import { pingHandler } from '../controllers/ping.controller';

// define a route object
const pingRouter = express.Router();

function middleware1 (req: Request , res : Response , next : NextFunction){
  console.log("Middleware1 is activated");
  next();
  
}

function middleware2 (req: Request , res : Response , next : NextFunction){
  console.log("Middleware2 is activated");
  next();
  
}

// now define the route on this object
pingRouter.get('/ping' ,middleware1,middleware2, pingHandler)

export default pingRouter;