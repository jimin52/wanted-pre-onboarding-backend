# wanted-pre-onboarding-backend
원티드의 프리온보딩 백엔드 인턴십 선발과제를 제출하기 위한 레포지토리입니다.

## 목차
- [구현 내역](#구현-내역)
- [DB 모델 상세](#db-모델-상세)

---

[과제 링크](https://bow-hair-db3.notion.site/1850bca26fda4e0ca1410df270c03409)

회사가 작성하는 채용공고에 대해서 간단한 [`CRUD`](https://ko.wikipedia.org/wiki/CRUD) 를 구현하는 과제이다.

## 구현 내역
- DB 모델: 회사, 사용자, 채용공고, 지원내역
- 채용공고에 대한 CRUD 구현
- 채용공고 검색기능. 검색어를 query 로 입력받아 검색.
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

