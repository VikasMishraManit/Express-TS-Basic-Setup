import express from 'express';
import {serverConfig} from './config/index';
import v1Router from './routers/v1/index.router';
import { z } from 'zod';


const app = express();

// for serializing and de-serializing
app.use(express.json()); // to parse json body

app.use('/api/v1',v1Router);

console.log('env variables are loaded');


app.listen(serverConfig.PORT, () => {
  console.log(`Server is running on http://localhost:${serverConfig.PORT}`);
  console.log('Press Ctrl+C to stop the server');

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
  
  
});
