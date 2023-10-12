# wanted-pre-onboarding-backend
원티드의 프리온보딩 백엔드 인턴십 선발과제를 제출하기 위한 레포지토리입니다.

## 목차
- [실행 방법](#실행-방법)
- [컨벤션](#컨벤션)
- [구현 내역](#구현-내역)
- [DB 모델 상세](#db-모델-상세)

---

[과제 링크](https://bow-hair-db3.notion.site/1850bca26fda4e0ca1410df270c03409)

회사가 작성하는 채용공고에 대해서 간단한 [`CRUD`](https://ko.wikipedia.org/wiki/CRUD) 를 구현하는 과제이다.

## 실행 방법
### env 파일
root 에 .env 파일 추가
```text
DATABASE_URL="" #postgresql 서버의 URL 추가
```
### 배포 환경에서 실행
```bash
npm run prod
```

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

---

## 구현 내역
- DB 모델: 회사, 사용자, 채용공고, 지원내역
- 채용공고에 대한 CRUD 구현
- 채용공고 검색기능. 검색어를 query 로 입력받아 검색
- 채용공고 상세내용 검색기능 추가
- 회사가 낸 공고 리스트를 조회하는 기능 추가

---

## DB 모델 상세
### Company
```object
{
    id,
    name,
    contry,
    region,
}
```
### Recruitment
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
### User
```object
{
    id,
    name,
    email,
}
```
### Application
```object
{
    recruitmentId,
    userId,
}
```

