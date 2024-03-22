/**
 * 다음은 배열의 빈배열의 상태 유무를 나타내는 utils 함수중 하나입니다.
 *
 * @param {unknown[]} list
 * @returns {boolean} 빈배열일 경우 true / 그렇지 않으면 false 를 반환합니다.
 */
export default function isEmptyArrayHelper(list: unknown[]): boolean {
  return Array.isArray(list) && list.length === 0;
}
