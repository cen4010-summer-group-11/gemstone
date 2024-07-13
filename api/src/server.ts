import 'colors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { PORT } from './config';
import { genericErrorHandler } from './middleware/error/generic-error';
import authRouter from './routes/auth';
import './db/db';
import { isAuthenticated } from './middleware/auth';

const app = express();

app.use(morgan('tiny')); // logging
app.use(express.json()); // response body to json parsing

// routes
app.use('/auth', authRouter);

// health check
app.use(
  '/',
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ ping: 'pong' });
  }
);

app.use(genericErrorHandler);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`.blue);
});
