import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../../util/error';

export const genericErrorHandler = (
  error: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status).json(error);
};
