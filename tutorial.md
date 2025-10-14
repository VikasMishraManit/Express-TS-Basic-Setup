1) To run typescipt 
-> use ts-node
-> or convert ts into js

// Steps 

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




    // Running the ts server

    1) npx ts-node src/server.ts 
    this will directly execute the file ( server will start running)

    2) npx tsc
    this will create a dist foler , inside that folder we will be having 
    all the ts->js compiled files
    ex: server.js file will be there (with type checking)
    node dist/server.js ( now we can run this file)

    This js code will not be having a lot of baggage and we can directly ship
    this js code  


