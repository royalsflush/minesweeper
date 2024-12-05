import assert from 'assert';
import request from 'supertest';
import app from '../index.js';


describe('Put some scores for easy and read them', () => {
  it('Gets the leaderboard for easy', async () => {
    return request(app)
      .get('/leaderboard')
      .query({difficulty: 'easy'})
      .retry(3)
      .expect(200);
  });

  /*
  it('Put a new score up', async () => {
    return request(app).post('/leaderboard').retry(3).expect(200);
  });*/
});

describe('Invalid leaderboard queries', () => {
  it('Tries to get the leaderboard with no difficulty', async() => {
    return request(app)
      .get('/leaderboard')
      .expect(400)
      .expect(function(res) {
        assert.match(res.text, /No difficulty given./);
      });
  });

  it('Tries to get the leaderboard with an invalid difficulty', async() => {
    return request(app)
      .get('/leaderboard')
      .query({difficulty: 'notValid'})
      .expect(400)
      .expect(function(res) {
        assert.match(res.text, /Invalid difficulty./);
      });
  });

  it('Tries to get the leaderboard with query but no difficulty', async() => {
    return request(app)
      .get('/leaderboard')
      .query({another: 'easy'})
      .expect(400)
      .expect(function(res) {
        assert.match(res.text, /No difficulty given./);
      });
  });

})

describe('Try to fetch pages that dont exist', () => {
  it('Try to get /', async() => {
    return request(app).get('/').expect(404);
  });
});
