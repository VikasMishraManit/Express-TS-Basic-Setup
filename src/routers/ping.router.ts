import express from 'express';
import { pingHandler } from '../controllers/ping.controller';

// define a route object
const pingRouter = express.Router();

// now define the route on this object
pingRouter.get('/ping' , pingHandler)

export default pingRouter;