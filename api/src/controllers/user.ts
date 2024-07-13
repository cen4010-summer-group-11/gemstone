import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user';
import { ErrorCodes, respondWithError } from '../util/error';

export default class UserController {
  /**
   * We take from response body:
   * username, password
   */
  static async RegisterUser(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(
        respondWithError({
          status: ErrorCodes.BAD_REQUEST_ERROR,
          message: 'No username/password',
        })
      );
    }

    try {
      const registerResponse = await UserService.RegisterUser(
        username,
        password
      );

      res.status(200).json(registerResponse);
    } catch (error) {
      return next(error);
    }
  }

  static async LoginUser(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(
        respondWithError({
          status: ErrorCodes.BAD_REQUEST_ERROR,
          message: 'No username/password',
        })
      );
    }

    try {
      const loginResponse = await UserService.LoginUser(username, password);

      res.status(200).json(loginResponse);
    } catch (error) {
      return next(error);
    }
  }

  //   // TODO
  // }

  // static VerifyUser(req: Request, res: Response, next: NextFunction) {
  //   const bearerToken = req.get('Authorization');

  //   if (!bearerToken) {
  //     return next(
  //       respondWithError({
  //         status: ErrorCodes.BAD_REQUEST_ERROR,
  //         message: 'No bearer token',
  //       })
  //     );
  //   }

  //   // TODO
  // }
}
