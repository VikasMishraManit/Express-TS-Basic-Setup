1) To run typescript 
-> use ts-node
-> or convert ts into js

<!-- ====================== Section Separator ====================== -->
Basic Setup

1) npm init -y
2) npm install express

Now , add more dependencies to help us in the project
Install these as dev dependencies

3) npm install -D ts-node

when we installed express , a lot of js code was also installed 
so we need to define types for those

4) npm install -D @types/express
5) npm install -D @types/node

install nodemon library

6) npm install -D nodemon

See all these installations in the package.json file


<!-- ====================== Section Separator ====================== -->
// Now we have to configure the typescript
to do so we will make a tsconfig.json file 

1) npm install -D typescript ( first install typescript)
2) npx tsc --init. ( or make your own file)

3) In tsconfig.json file add these below compiler options
,
  "include": [
    "src/**/*". (-> it means all files inside src folder)
  ],
  "exclude": [
    "node_modules",
  ]

    "skipLibCheck": true, -> (.d.ts files also excluded)
     "outDir": "./dist", -> (tells where all compiled files will go)
    "rootDir": "./src",  -> (src folder is the root folder)


// add type:module in package.json for es6

<!-- ====================== Section Separator ====================== -->
// Running the ts server

    1) npx ts-node src/server.ts 
    this will directly execute the file ( server will start running)

    2) npx tsc
    this will create a dist folder , inside that folder we will be having 
    all the ts->js compiled files
    ex: server.js file will be there (with type checking)
    node dist/server.js ( now we can run this file)

    This js code will not be having a lot of baggage and we can directly ship
    this js code  

<!-- ====================== Section Separator ====================== -->
    /*
    git init
    git add .
    git commit -m "add commit"
    git remote add origin 
    git checkout -b master
    git push origin master
    */

<!-- ====================== Section Separator ====================== -->
Handling sensitive and configurable info (say port changes then application will reload) to handle this we will make a env file

env varibales are stored in os level and any process can access these
ex: type env in terminal to see all these

to manage these env varibales there is a nodejs package 

1) npm i dotenv
2) now create a .env file inside the project only

<!-- ====================== Section Separator ====================== -->

1) config layer : it willl contain all the configuration files 

dotenv.config(): it will load all the env variales from the .env file to the config file
when server is running . When server stops then it doesnt get loaded 

to check this : in config folder -> index.ts make a function , inside that call
dotenv.config() and then export that function to the main file (server.ts)
print to check if the environment variables are loaded or not

2) To provide extra layer of security in these env variables , people use key vaults
like aws key vault , azure key vault etc

<!-- ====================== Section Separator ====================== -->

In production we avoid this process.env()
/* 
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  console.log('Press Ctrl+C to stop the server');
  
});
*/

Instead we will create a object that contains all the env variables 

1) In index.ts file define the types and export it
type EnvConfig = {
  PORT : number
}

export const envConfig : EnvConfig = {
  PORT : Number (process.env.PORT) || 3005
}

2) Now in the server.ts file use envConfig.PORT instead of process.env.PORT


<!-- ====================== Section Separator ====================== -->
Controllers : are the function after validators that handle the requests . Here
this function acts as a controller 

app.get('/ping', (req, res) => {
  res.send('pong');
});

So now this changes to 

app.get('/ping', pingHandler); -> when we get ping request we pass it to the controller

Note : we get ping request , it is being redirected to the pingHandler (cntroller)
so this line is basically a routing line 


<!-- ====================== Section Separator ====================== -->

Routing : There is a mechanism called as express routing to define the routing layer.
In this mechanism we donot define routes directly on the app object (this ensures that our
app object is not changed by the routing layer)

Instead create a routerobject and then define the routes on that object (say pingRouter)

// Below line registers all the routers and their corresponding routes
// to the  app server object
app.use(pingRouter);
// we can add more routers

Note : app.use(middlewarename) registers this middleware to all the requests

<!-- ====================== Section Separator ====================== -->

Middleware : are functions having access to req , res and next middleware function

pingRouter.get('/ping' ,middleware1,middleware2, pingHandler)


Here pingHandler is the terminaing middleware

<!-- ====================== Section Separator ====================== -->

We can segregate parts of a url and assign a one router 

Instead of this in server.ts (app.use(pingRouter))

do this 
app.use('/ping' , pingRouter) -> request starts with ping then assign pingRouter object

Now in pinRouter.ts

pingRouter.get('/' , pingHandler) -> If that is a get request and end there only
it is being handled by the pingHandler router

If url after ping is health then do this
pingRouter.get('/health' , (req,res) =>{
  res.status(200).send('OK');
});

Now , because of this we will be able to implement a very interesting feature called as
api versioning

<!-- ====================== Section Separator ====================== -->

API Versioning : We want to handle 1 set of api through 1 router. Keeping that api
we can add more api's that can be handled by different routers 

app.use('/api/v1' , v1)
app.use('/api/v2' ,v2)


<!-- ====================== Section Separator ====================== -->

Restarting Server : We donot want to restart the server again and again . So we will create a script for that

Whenever code changes , nodemon automatically restarts the server
cmd is : npx nodemon src/server.ts

However in package.json we can add script for that
 "scripts": {
    "start": "ts-node src/server.ts",
    "dev" : "nodemon src/server.ts"
  }

  Now , we can simply run 
  npm start 
  npm run dev (apart from start and test put run before the command )

<!-- ====================== Section Separator ====================== -->
Sending data through Postman and receiving it on the express

console.log("req body is " , req.body); -> req body is undefined
console.log("req query is " , req.query); -> but we can see request params

Output:
'req body is  undefined
req query is  [Object: null prototype] { age: '23', gender: 'male' }
'
Reason : both query params and url params are string . so express knows it already
and hence it has logic written for it to be parsed(this thing is called as serialization and deserialization)

However , request body can be text/xml/json etc. Express can still do the 
serialization and de-serilization for us , but first we have to tell it about
the type 

<!-- ====================== Section Separator ====================== -->

Serialization and De-Serialization of the body : It is done by using the 
middleware

app.use(express.json()) or app.use(express.text())

Output : 
req body is  { name: 'vikas', company: 'Sigmoid' }
req query is  [Object: null prototype] { age: '23', gender: 'male' }

<!-- ====================== Section Separator ====================== -->
Url encoding 

The url cannot have anything inside it (like comma). But using allowed characters
we can use this (	its url encoding is this : %2C)

We can also send this type of url encoded data in the express .

<!-- ====================== Section Separator ====================== -->
Reading URL Params

When you want to send the data in the url params , you have to tell the express js
that this part of the url is varaible

pingRouter.get('/:id/comments' , pingHandler)(where final request have been mentioned)
That colon part is the varaible part

<!-- ====================== Section Separator ====================== -->
JSON's are not type-safe . So to improve this we are going to add the validation
layer to it

Start from 1:44

<!-- ====================== Section Separator ====================== -->
ZOD 

-> Install zod : npm i zod
-> Define the schema of the object/value that you want to test
->ZOD will test it through the parse function

 // let us make a object
  const obj = {
    name: 'Test Object',
    age : 23
  }

  // now let us define a zod schema for this object
  const objSchema = z.object({
    name: z.string(),
    age: z.number().int().positive()
  });

  console.log(objSchema.parse(obj));

<!-- ====================== Section Separator ====================== -->
Using ZOD in the validation layer to validate the request body

-> For every request body we are going to maintain a schema . For example : 
schema for req body createUser 
schema for req body createPost req

Whenever that req comes to us , we will parse that req body in the parse function of 
that schema . In this way we are going to validate it .

Also to make the code non-blocking , we are having async function for the parsing

<!-- ====================== Section Separator ====================== -->

Src->validators->index.ts

-> create a function to validate the req body 
-> its argument will be the zod schema
-> and the type of that zod schema is going to be any zod object
-> it returns a middleware function to return the validate the request body for us

-> This function will create a middleware on the go 
-> make sure this is async 

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


<!-- ====================== Section Separator ====================== -->
   Adding Error Handling 
<!-- ====================== Section Separator ====================== -->

For synchronous function , express throws the error automatically
For async function , we need to pass an next middleware

flow : validators - > controller - > express error handler

synchronous function error 
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})


async function error 

app.get('/', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})

<!-- ====================== Section Separator ====================== -->
Manual Error Handling

import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";

export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {
  
  try{
 await fs.readFile("sample")
 res.status(200).json({message : "pong"});
  } catch(error){
  console.log("error in reading file",error);
  res.status(500).json({message : "Internal server error"});
  }
};

For lot of controller functions , we will be doing the error handling in the same way. So , we can make a middleware 
to handle that error handling .

<!-- ====================== Section Separator ====================== -->
Generic error handling middleware

-> src - > middlewares -> error.middleware.ts 

make the custom generic error handling middleware 

import { NextFunction, Request, Response } from "express";

export const genericErrorHandler = (err : any , req:Request , res : Response , next : NextFunction) =>{
    res.status(501).json({
        success: false,
        message: "something went wrong !!!"
    })
}

//now in the server.ts

// after all the routers , add the custom error handler
app.use(genericErrorHandler);

// our final pingcontroller.ts

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

// we can also do this (since express automatically calls next) in express versions 5 or above

import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";

export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {
  

 await fs.readFile("sample")
 res.status(200).json({message : "pong"})  
};

<!-- ====================== Section Separator ====================== -->
Different error messages for different responses

src -> utils -> errors -> app.error.ts



-> now in the app.error.ts file , complete the file 

-> in the generic error handler (error middleware) , define the type of the error , statusCode and error message


import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";

export const genericErrorHandler = (err : AppError , req:Request , res : Response , next : NextFunction) =>{

    console.log("error parameters is " , err);
    
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}


-> and then in the ping controller , throw this error

import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import { AppError } from "../utils/errors/app.error";

export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {
  
  try{
 await fs.readFile("sample")
 res.status(200).json({message : "pong"});
  } catch(error){
     // now let us make object from the custom error
     const customError : AppError = {
        statusCode : 500 ,
        message : "Internal Server Error",
        name : 
     }

     throw customError ;
  }
};

<!-- ====================== Section Separator ====================== -->
We can make it even more cleaner

-> class for the internal server error 
export interface AppError extends Error{
     statusCode : number ,
}

export class InternalServerError implements AppError {
    statusCode: number;
    message: string;
    name: string;

    constructor(message : string){
        this.statusCode = 500 ;
        this.message = message;
        this.name = "InternalServerError"
    }
}

-> and send this error in the controller (ping.controller.ts)

import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import { InternalServerError } from "../utils/errors/app.error";

export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {
  
  try{
 await fs.readFile("sample")
 res.status(200).json({message : "pong"});
  } catch(error){
     
    throw new InternalServerError("Something went wrong while reading the file");
  }
};


Summary 
-> in the server.ts we have app.use(genericErrorHandler)
-> which is coming from the error.middleware.ts file
-> this file has err of type AppError
-> which is implemented in the app.error.ts file ( present in errors folder , which is present in utils)



<!-- ====================== Section Separator ====================== -->
Adding production grade loggers 
<!-- ====================== Section Separator ====================== -->
Use case : Let us say somebody made a payment on airbnb , the payment got deducted but they received errors . As a engineer , to 
look into the problem , we have to know few things
- when the request was made 
- what procedures were done right 
- what went wrong with it etc

For all these logging is very necessary things (on  call engineers depend on this )

Why console.log() will not work ? : Because that will be visible for only that session 

There are many logging libraries for us to use like morgan , pino , winston etc 

Logging Library we are going to use : Winston

<!-- ====================== Section Separator ====================== -->
Now , we have to prepare a logger object (we have to do some configuration for this object )

src ->config ->logger.config.ts

Properties of this logger object 

-> Transport : it tells where should the logs go 
-> Format : what should the log print (timestamp , messages etc)

import winston from "winston";

const logger = winston.createLogger({
    // define the format
      format: winston.format.combine(
        winston.format.timestamp({format : "MM-DD-YYYY HH:mm:ss"}),
        winston.format.json(),
        // define the custom print
        winston.format.printf(({level,message,timestamp,...data})=>{
         const output = {level,message,timestamp,data};
         return JSON.stringify(output);
        })
      ),

      // define the transport 
      transports : [
        new winston.transports.Console(),
      ]
});

export default logger;

and in the server.ts file

app.listen(serverConfig.PORT, () => {
  console.log(`Server running on http://localhost:${serverConfig.PORT}`);
  logger.info(`press ctrl +c to stop the server` , {"name" : "dev server});
});


In the transport array , we can mention the place where we want to store our logger object

<!-- ====================== Section Separator ====================== -->

Problem Statement : user1 -> we store its log , user2 ->we store its logs then again user1 and so on
How are we going to identify which users log are there in the logger

Solution : Corelation Id (unique id for a particular request)

Steps :

-> Generate a unique id ( using UUID package)
-> Before any request (in server.ts file) add a middleware for it

This approach is going to be working in 80-90 percent cases . There will be some corner cases , but first let us 
try out this approach

config->logger.config.ts
import winston from "winston";


const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss"  }), // how the timestamp should be formatted
        winston.format.json(), // Format the log message as JSON
        // define a custom print
        winston.format.printf( ({  level, message, timestamp, ...data }) => {
            const output = { 
                level,
                message, 
                timestamp, 
                data 
            };
            return JSON.stringify(output);
        })
    ),
    transports: [
        new winston.transports.Console(),
    ]
});

export default logger;

and add this correlation id in every log of the logger

<!-- ====================== Section Separator ====================== -->
Correlation Id in the background job (not in case of rest api)

Let us say that some helper function form the utility folder (it will not have correlation id attached)

Solution : AsyncStorage in NodeJS  

utils ->helpers -> request.helpers.ts

import {AsyncLocalStorage} from 'async_hooks';

type AsyncLocalStorageType = {
    correlationId : string;
}

const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageType>();

export const getCorrelationId = () =>{
    const asyncStore = asyncLocalStorage.getStore();
    return asyncStore ?.correlationId || 'unknown error while creating correlation id'
}


and then in the correlation middleware


import { NextFunction, Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { asyncLocalStorage } from '../utils/helpers/request.helper';

export const attachCorrelationIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Generate a unique correlation ID
    const correlationId = uuidV4();
    
    req.headers['x-correlation-id'] = correlationId;

    // Call the next middleware or route handler
    asyncLocalStorage.run({correlationId : correlationId},()=>{
       next();
    })
   
}

and then in the logger config we attach it in the output json

import winston from "winston";
import { getCorrelationId } from "../utils/helpers/request.helper";


const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss"  }), // how the timestamp should be formatted
        winston.format.json(), // Format the log message as JSON
        // define a custom print
        winston.format.printf( ({  level, message, timestamp, ...data }) => {
            const output = { 
                level,
                message, 
                timestamp, 
                correlationId : getCorrelationId(),
                data 
            };
            return JSON.stringify(output);
        })
    ),
    transports: [
        new winston.transports.Console(),
    ]
});

export default logger;

logger.something -> calls get correlationId -> which fetches the asyncStore -> and asyncStore for the current async context
has the correlation id 


<!-- ====================== Section Separator ====================== -->
Storing the logs in a file

in the logger.config.ts file 
transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename : "logs/app.log"})
    ]

<!-- ====================== Section Separator ====================== -->

    // log file seprately for every single day
    Solution : winston daily rotate file

in logger.config.ts file 


    import winston from "winston";

import DailyRotateFile from "winston-daily-rotate-file";
import { getCorrelationId } from "../utils/helpers/request.helper";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss"  }), // how the timestamp should be formatted
        winston.format.json(), // Format the log message as JSON
        // define a custom print
        winston.format.printf( ({  level, message, timestamp, ...data }) => {
            const output = { 
                level,
                message, 
                timestamp, 
                correlationId: getCorrelationId(), 
                data 
            };
            return JSON.stringify(output);
        })
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: "logs/%DATE%-app.log", // The file name pattern
            datePattern: "YYYY-MM-DD", // The date format
            maxSize: "20m", // The maximum size of the log file
            maxFiles: "14d", // The maximum number of log files to keep
        })
        // TODO: add logic to integrate and save logs in mongo
    ]
});

export default logger;
