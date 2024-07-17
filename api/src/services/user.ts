import 'colors';
import { JWT_SECRET, SALT_ROUNDS } from '../config';
import * as bcrypt from 'bcrypt';
import queryDb from '../db/db';
import { ErrorCodes, ErrorResponse, respondWithError } from '../util/error';
import { respond } from '../util/data';
import { createJWT, verifyJWT } from '../util/jwt';
import { JwtPayload } from 'jsonwebtoken';

export default class UserService {
  static async RegisterUser(username: string, password: string) {
    // check if username is taken
    const isUsernameTaken = await this.IsUserRegistered(username);
    if (isUsernameTaken) {
      throw respondWithError({
        status: ErrorCodes.BAD_REQUEST_ERROR,
        message: 'Username taken',
      });
    }

    // hash password
    const hash = await bcrypt.hash(password, SALT_ROUNDS || 10);

    if (!hash) {
      throw respondWithError({ status: ErrorCodes.INTERNAL_ERROR });
    }

    // insert into db
    try {
      const res = await queryDb(
        `
      INSERT INTO users (username, pw)
      VALUES ($1, $2)   
      RETURNING username
      `,
        [username, hash]
      );

      // create JWT
      const bearerToken = createJWT(JWT_SECRET, {
        username: res[0].username,
      });

      return respond({ data: bearerToken });
    } catch (error) {
      throw error;
    }
  }

  static async LoginUser(username: string, password: string) {
    try {
      const res = await queryDb(
        `
        SELECT username, pw
        FROM users
        WHERE username = $1 
        `,
        [username]
      );

      if (!res.length) {
        throw respondWithError({
          status: ErrorCodes.BAD_REQUEST_ERROR,
          message: 'Username not found',
        });
      }

      const match = await bcrypt.compare(password, res[0].pw);

      // password does not match
      if (!match) {
        throw respondWithError({
          status: ErrorCodes.UNAUTHORIZED_ERROR,
          message: 'Password does not match',
        });
      }

      // user authenticated, create JWT
      const bearerToken = createJWT(JWT_SECRET, {
        username: res[0].username,
      });

      return respond({ data: bearerToken });
    } catch (error) {
      throw error;
    }
  }

  static async IsUserRegistered(username: string): Promise<boolean> {
    const response = await queryDb(
      `
      SELECT username
      FROM users
      WHERE username = $1
      `,
      [username]
    );

    if (response.length) return true;
    return false;
  }

  static async RefreshUserToken(bearerToken: string) {
    try {
      const oldToken = verifyJWT(JWT_SECRET, bearerToken) as JwtPayload;

      if (!oldToken?.username) {
        throw respondWithError({
          status: ErrorCodes.BAD_REQUEST_ERROR,
          message: 'No username found in token/expired token',
        });
      }

      const newToken = createJWT(JWT_SECRET, { username: oldToken.username });
      return respond({ data: newToken });
    } catch (error) {
      throw error;
    }
  }
}
