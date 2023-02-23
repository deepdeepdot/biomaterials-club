let axios = require('axios');

jest.mock('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const fetchUsers = async () => {
  try {
    return await axios.get(`${BASE_URL}/users`);
  } catch (e) {
    return [];
  }
};

// https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/

describe('when API call is successful', () => {
  it('should return users list', async () => {
    // given
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Andrew' },
    ];
    axios.get.mockResolvedValueOnce(users);
    // when
    const result = await fetchUsers();

    // then
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users`);
    expect(result).toEqual(users);
  });

  it('should return empty list', async () => {
    // given
    axios.get.mockRejectedValue(new Error('bad luck my friend'));

    // when
    const result = await fetchUsers();

    // then
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users`);
    expect(result).toEqual([]);
  });
});
