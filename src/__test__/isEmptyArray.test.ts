import isEmptyArrayHelper from '../utils/helper/isEmptyArray.helper';

/**
 * isEmptyArrayHelper
    √ 빈 배열에 대해 true를 반환해야 합니다. (4 ms)
    √ 비어 있지 않은 배열에 대해 false를 반환해야 합니다.

    Test Suites: 1 passed, 1 total
    Tests:       2 passed, 2 total
    Snapshots:   0 total
    Time:        2.835 s
    Ran all test suites.

    Watch Usage: Press w to show more.
 */

describe('isEmptyArrayHelper', () => {
  it('빈 배열에 대해 true를 반환해야 합니다.', () => {
    expect(isEmptyArrayHelper([])).toBe(true);
  });

  it('비어 있지 않은 배열에 대해 false를 반환해야 합니다.', () => {
    expect(isEmptyArrayHelper([1, 2, 3])).toBe(false);
  });

  it('비어 있지 않은 배열에 대해 false를 반환해야 합니다.', () => {
    expect(isEmptyArrayHelper([undefined])).toBe(false);
  });
});
