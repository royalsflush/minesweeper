import assert from 'assert';
import supertest from 'supertest';
import app from '../index.js';

let request;
describe('Unit Tests', () => {
  before(() => {
    request = supertest(app);
  });

  it('Gets the leaderboard for a particular level', async () => {
    const response = await request.get('/leaderboard').retry(3).expect(200);
  });

  it('Put a new score up', async () => {
    process.env.NAME = '';
    const response = await request.post('/leaderboard').retry(3).expect(200);
    assert.equal(response.text, 'Hello World!');
  });
});
