import express from 'express';
import { serverConfig } from './config/index';
import v1Router from './routers/v1/index.router';
import { genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
const app = express();

app.use(express.json());

// add the correlation id before any request
app.use(attachCorrelationIdMiddleware);

app.use('/api/v1', v1Router);

// after all the routers , add the custom error handler
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, () => {
  console.log(`Server running on http://localhost:${serverConfig.PORT}`);
  logger.info('press ctrl +c to stop the server' , {"name" : "dev server"})
});
