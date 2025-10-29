1) To run typescipt 
-> use ts-node
-> or convert ts into js

<!-- ====================== Section Separator ====================== -->
Basic Setup

1) npm init -y
2) npm install express

Now , add more dependencies to help us in the project
Install these as dev dependenices

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

<!-- ====================== Section Separator ====================== -->

Middleware : are functions having access to req , res and next middleware function

pingRouter.get('/ping' ,middleware1,middleware2, pingHandler)


Here pingHandler is the terminaing middleware