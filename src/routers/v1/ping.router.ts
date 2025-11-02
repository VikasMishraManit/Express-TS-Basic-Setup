import express from 'express';
import { pingHandler } from '../../controllers/ping.controller';

// define a route object
const pingRouter = express.Router();



// now define the route on this object
pingRouter.get('/:id/comments' , pingHandler)

pingRouter.get('/health' , (req,res) =>{
  res.status(200).send('OK');
});



export default pingRouter;