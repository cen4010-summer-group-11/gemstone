import 'colors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { PORT } from './config';
import { genericErrorHandler } from './middleware/error/generic-error';
import authRouter from './routes/auth';
import './db/db';
import purchaseRouter from './routes/purchase';
import itemRouter from './routes/item';
import invoiceRouter from './routes/invoice';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(morgan('tiny')); // logging
app.use(express.json()); // response body to json parsing

// routes
app.use('/auth', authRouter);
app.use('/purchase', purchaseRouter);
app.use('/item', itemRouter);
app.use('/invoice', invoiceRouter);

// health check
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ ping: 'pong' });
});

app.use(genericErrorHandler);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`.blue);
});

export default app;
