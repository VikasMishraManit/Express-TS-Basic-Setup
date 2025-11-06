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