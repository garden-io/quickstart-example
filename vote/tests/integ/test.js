import axios from 'axios'
import { describe, expect, it } from 'vitest'

describe('GET /', () => {
  it('should respond with 200', async () => {
    const result = await axios.get('http://vote', {});
    expect(result.status).to.eql(200);
  });
});

describe('POST /api/vote', () => {
  it('should respond with 200', async () => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    };
    const voteResult = 'a';
    const result = await axios.post('http://vote/api/vote', `vote=${voteResult}`, { headers });
    expect(result.status).to.eql(200);
  });
});
