import request from 'supertest';

import app from '../src/server';

describe('server', () => {
  test('Health check', async () => {
    const res = await request(app).get('/');
    expect(res.body).toEqual({ ping: 'pong' });
  });
});
