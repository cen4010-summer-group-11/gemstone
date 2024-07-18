import { NextFunction, Request, Response } from 'express';
import { ErrorCodes, respondWithError } from '../util/error';
import { verifyJWT } from '../util/jwt';
import { JWT_SECRET } from '../config';
import { JwtPayload } from 'jsonwebtoken';

/**
 * Middleware to check request is authenticated, can be prepended to any route
 */
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.get('Authorization');

  if (!bearerToken) {
    return next(
      respondWithError({
        status: ErrorCodes.BAD_REQUEST_ERROR,
        message: 'No bearer token',
      })
    );
  }

  // get token payload, append to local variable
  try {
    const payload = verifyJWT(JWT_SECRET, bearerToken);

    if (payload) {
      res.locals.user = payload;
      res.locals.username = (payload as JwtPayload).username;
    }

    next();
  } catch (error) {
    return next(error);
  }
};
