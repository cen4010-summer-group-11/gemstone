import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../../util/error';

export const genericErrorHandler = (
  error: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  res.status(error.status || 500).json(error);
};
