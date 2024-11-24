import assert from 'assert';
import supertest from 'supertest';
import app from '../index.js';

let request;
describe('Unit Tests', () => {
  before(() => {
    request = supertest(app);
  });

  it('Service uses the NAME override', async () => {
    process.env.NAME = 'Cloud';
    const response = await request.get('/').retry(3).expect(200);
    assert.equal(response.text, 'Hello Cloud!');
  });

  it('Service uses the NAME default', async () => {
    process.env.NAME = '';
    const response = await request.get('/').retry(3).expect(200);
    assert.equal(response.text, 'Hello World!');
  });
});
