/**
 * @jest-environment jsdom
 */

let axios = require('axios');

const { download } = require('./slack_2_download_images');

jest.mock('axios'); // conflict with another mock for axios for a different test

describe('download calling axios', () => {
  test('download', async () => {
    let url =
      'https://images.unsplash.com/photo-1504164996022-09080787b6b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
    let headers = {};

    download(url, headers);

    expect(axios).toHaveBeenCalledWith({
      url,
      method: 'GET',
      headers,
      responseType: 'stream',
    });
  });
});
