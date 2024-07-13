import 'dotenv/config';

export const JWT_SECRET = process.env.JWT_SECRET ?? 'beep';
export const PORT = process.env.PORT ?? 3000;
export const DB_URL =
  process.env.DB_URL ??
  'postgresql://postgres:postgres@127.0.0.1:5432/postgres';
export const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
