import assert from 'assert';
import request from 'supertest';
import app from '../index.js';


describe('Put some scores for easy and read them', () => {
  it('Gets the leaderboard for easy', async () => {
    return request(app)
      .get('/leaderboard')
      .send({difficulty: 'easy'})
      .retry(3)
      .expect(200);
  });

  it('Put a new score up', async () => {
    return request(app).post('/leaderboard').retry(3).expect(200);
  });
});

describe('Invalid leaderboard queries', () => {
  it('Tries to get the leaderboard with no difficulty', async() => {
    return request(app)
      .get('/leaderboard')
      .expect(500)
      .expect(function(res) {
        assert.strictEqual(res.body, "Invalid difficulty.");
      });
  });

})

describe('Try to fetch pages that dont exist', () => {
  it('Try to get /', async() => {
    return request(app).get('/').expect(404);
  });
});
