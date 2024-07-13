import 'colors';
import { Pool } from 'pg';
import { DB_URL } from '../config';

// create pool of database connections
const pool = new Pool({
  database: 'postgres',
  host: 'localhost',
  password: 'postgres',
  user: 'postgres',
  port: 5433,
});

/**
 * @see https://node-postgres.com/apis/pool#events
 */
pool.on('error', (error, client) => {
  console.error('Unexpected error on idle client'.bgRed, error);
  process.exit(-1);
});

/**
 * handle database pool connection, execute, and release.
 * @param query string
 */
const queryDb = async (query: string, args?: Array<any>) => {
  const client = await pool.connect();

  let res;
  try {
    res = await client.query(query, args ?? undefined);
  } catch (error) {
    console.log('Database Query Error:'.red, error);
    // let error be handled to whichever function calls it
    throw error;
  }
  client.release();

  return res.rows;
};

export default queryDb;
