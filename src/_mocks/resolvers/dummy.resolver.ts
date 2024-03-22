import { http, HttpResponse } from 'msw';
import dummyData from '../db/dummy.json';

// DTO
import { DummyDTO } from '@dto/dummy.dto';

const getDummy = http.get(
  // "/dummy" 문자열은 경로(predicate)입니다.
  // "/dummy" 문자열과 경로가 일치하는
  // GET 요청만 가로챕니다.
  `/api/dummy`,
  // 아래 함수는 "resolver" 함수입니다.
  // 가로챈 요청에 대한 다양한 정보를 받아들이고,
  // 어떻게 처리할지를 결정합니다.
  ({ request, params, cookies }) => {
    return HttpResponse.json(dummyData as DummyDTO[]);
  },
);

export default { getDummy };
