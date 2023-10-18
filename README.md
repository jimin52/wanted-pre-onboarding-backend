# wanted-pre-onboarding-backend
원티드의 프리온보딩 백엔드 인턴십 선발과제를 제출하기 위한 레포지토리입니다.

## 목차
- [실행 방법](#실행-방법)
- [컨벤션](#컨벤션)
- [구현 내역](#구현-내역)
- [과제 분석](#과제-분석)


[과제 링크](https://bow-hair-db3.notion.site/1850bca26fda4e0ca1410df270c03409)

---
회사가 작성하는 채용공고에 대해서 간단한 [`CRUD`](https://ko.wikipedia.org/wiki/CRUD) 를 구현하는 과제이다.

## 실행 방법
### postgresql 작동시키기
DATABASE_URL 알아두기
### env 파일
root 에 .env 파일 추가
```text
DATABASE_URL=""     # postgresql서버의 URL 추가
PORT=3000           # default 3000으로 실행됨
```
### 배포 환경에서 실행
```bash
npn run db:init     # db migrate 및 seed
npm run start       # build 및 실행
```

### swagger
```
http://localhost/api-docs
```
접속하면 openapi 문서 확인 가능

---

## 컨벤션
### 깃 컨벤션
- conventional commit 컨벤션을 기준으로 한다
- 커밋 로그는 가급적 영어로 작성한다

### 브랜치 컨벤션
- Trunk Based Development 전략을 사용한다
- 브랜치 이름은 자유롭게 짓되 영어 알파벳으로 kebab-case 로 작성한다
- main 브랜치에 병합할 때는 squash merge 로 병합한다

### 코드 컨벤션
- ESLint, Prettier 설정을 따른다
- 컨벤션을 통합 관리하기 위해 VSCode 환경에서 작업한다

### 파일 컨벤션
- Layerd 전략
  - router
  - controller
  - service

---

## 과제 분석
### 과제 요구사항 분석
- DB 모델: 회사, 사용자, 채용공고, 지원내역
- 채용공고에 대한 CRUD 구현
- 채용공고 검색기능. 검색어를 query 로 입력받아 검색
- 채용공고 상세내용 검색기능 추가
- 회사가 낸 공고 리스트를 조회하는 기능 추가

### 기술 요구사항 분석
- ORM 사용
- RDMBS 사용
- Unit Test
- 코드 컨벤션
- Git Commit Message 컨벤션

### DB 모델 분석
#### Company
```object
{
    id,
    name,
    contry,
    region,
}
```
#### Recruitment
```object
{
    id,
    companyId,
    position,
    compensation,
    techStack,
    applications,
}
```
#### User
```object
{
    id,
    name,
    email,
}
```
#### Application
```object
{
    recruitmentId,
    userId,
}
```
---

## 구현 과정
### 기술 스택 확정
- express: 간단한 api 작성이기 때문에 단순한 프레임워크 사용
- typescript: 최소한의 타입 안전을 보장하기 위해 typescript 로 작성
- prisma: 타입 안전한 ORM 선택
- dotenv: env 값을 가져와야 해서 사용
- zod: 타입 이외의 런타임 validate 를 위해 사용

### 기본 세팅
- 기본 라이브러리 세팅 (express, typescript)
- validator 세팅 (zod)
- DB 세팅 (Prisma postgres 연결)
- Unit Test 세팅 (Jest)
- 컨벤션 세팅 (ESLint, Prettier)
- 아키텍처 구조 세팅 (router, controller, service 계층구조로 설정)

기본 세팅에 대한 간단한 endpoint 작성 후 구현 시작

### openapi
- zod-to-openapi 와 swagger-ui 라이브러리를 이용하여 api 문서 작성
- api 문서 작성 후 내부 로직 구현
### TDD
- Jest 를 활용한 테스트코드를 이용해 유닛별로 함수 작성
- 간단한 테스트 코드 작성 후 테스트를 통과하기를 반복하며 코드 작성
- 각 코드 작성하며 type 작성 및 구체화
