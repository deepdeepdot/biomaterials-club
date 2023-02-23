const mockFn = jest.fn();

function fnUnderTest(args1) {
  mockFn(args1);
}

beforeEach(() => {
  jest.clearAllMocks();
});

test('Testing once', () => {
  fnUnderTest('first-call');
  expect(mockFn).toHaveBeenCalledWith('first-call');
  expect(mockFn).toHaveBeenCalledTimes(1);
});

test('Testing twice', () => {
  // mockFn.mockClear();
  fnUnderTest('second-call');
  expect(mockFn).toHaveBeenCalledWith('second-call');
  expect(mockFn).toHaveBeenCalledTimes(1);
});

function fetchData(value) {
  return new Promise((resolve, reject) => {
    if (value) resolve(value);
    else reject(new Error('I cannot do this!'));
  });
}

test('the data is peanut butter', () => {
  fetchData('peanut butter').then((data) => {
    expect(data).toBe('peanut butter');
  });
});

test('the data is null', () => {
  fetchData().catch((e) => {
    expect(e).toStrictEqual(new Error('I cannot do this!'));
  });
});
