/**
 * @format
 * 프로젝트에서 쓰일 필수 타입들 전역 설정
 */

import styleConfig from '@configs/style.config';

declare global {
  export type Variant = 'primary' | 'secondary'; // 변수 타입 설정
  export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'; // 사이즈 타입 설정
  export type ID = number | string; // 아이디 타입
  export type Token = string; // 토큰 타입 설정
  export type Colors = keyof typeof styleConfig.colors; // 색상 타입 설정
}
export default { global };
