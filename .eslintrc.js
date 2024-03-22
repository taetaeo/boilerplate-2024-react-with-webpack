module.exports = {
  // 코드 실행 환경 설정
  env: {
    browser: true, // 브라우저 환경
    es2021: true, // ECMAScript 2021
    node: true, // Node.js 환경
  },
  // 확장 설정 - 기존 규칙 확장
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'prettier'],
  // 파서 설정 - TypeScript 사용
  parser: '@typescript-eslint/parser',
  // 파서 옵션 설정
  parserOptions: {
    ecmaVersion: 'latest', // ECMAScript 버전
    sourceType: 'module', // 모듈 형식
  },
  // 플러그인 설정
  plugins: ['@typescript-eslint', 'react'],
  // 규칙 설정
  rules: {
    '@typescript-eslint/no-var-requires': 'off', // TypeScript의 require 사용 금지 규칙 끄기
    '@typescript-eslint/consistent-type-imports': 'error', // 일관된 타입 임포트 규칙 활성화
  },
};
