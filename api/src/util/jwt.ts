import 'colors';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { ErrorCodes, respondWithError } from './error';
const { sign, verify } = jwt;

export const createJWT = (secret: string, payload: object): string => {
  const token = sign(payload, secret, {
    expiresIn: '2 days',
  });

  return `Bearer ${token}`;
};

export const verifyJWT = (secret: string, bearerToken: string) => {
  const token = bearerToken.split(' ')[1];

  try {
    const decoded = verify(token, secret);

    return decoded;
  } catch (error) {
    throw respondWithError({
      status: ErrorCodes.UNAUTHORIZED_ERROR,
      message: 'Invalid token',
    });
  }
};
