/**
 * Jest의 설정 파일인 jest.config.js입니다.
 * 이 파일은 Jest가 프로젝트의 테스트를 실행하는 방식을 지정합니다.
 */

/**
 * TypeScript로 작성된 Jest 설정 파일임을 나타내며,
 * ts-jest 패키지에서 가져온 JestConfigWithTsJest 타입을 사용한다는 것을 선언합니다.
 */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Jest에게 TypeScript 프로젝트를 다룰 수 있도록 하는 ts-jest preset을 사용하도록 지시합니다.
  preset: 'ts-jest',
  // Jest가 테스트를 실행할 환경을 지정합니다. 현재 설정에서는 'node'로 지정되어 있으므로, 테스트는 Node.js 환경에서 실행됩니다.
  testEnvironment: 'node',
  // 모듈 이름을 매핑하는 데 사용됩니다. '~/'로 시작하는 모든 모듈을 '<rootDir>/src/'로 매핑하여 상대 경로 대신 절대 경로로 참조할 수 있습니다.
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  // Jest가 각 테스트 후에 모든 모의 함수(mock functions)의 상태를 자동으로 재설정하도록 지시합니다. 이렇게 함으로써 각 테스트 간에 모의 함수의 상태가 격리됩니다.
  clearMocks: true,
};
