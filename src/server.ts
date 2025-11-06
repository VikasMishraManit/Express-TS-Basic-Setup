import express from 'express';
import { serverConfig } from './config/index';
import v1Router from './routers/v1/index.router';
import { genericErrorHandler } from './middlewares/error.middleware';
// import { genericErrorHandler } from './middleware/error.middleware';

const app = express();

app.use(express.json());
app.use('/api/v1', v1Router);
// after all the routers , add the custom error handler
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, () => {
  console.log(`Server running on http://localhost:${serverConfig.PORT}`);
});
