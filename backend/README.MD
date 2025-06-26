NODE.js 란 무엇인가??
Chrome V8 엔진 위에서 JavaScript 코드를 브라우저 밖에 실행할 수 있게 만든 오픈 소스 런타임
단일 스레드 + 이벤트 루프 구조로, 요청마다 쓰레드를 새로 만드는 대신 이벤트 큐에 등록해 처리

그렇다면 런타임은 무엇일까??
런타임은 어떤 프로그래밍 언어가 동작할 수 있는 실행 환경
내가 배운 내용을 생각해보면
- Python의 런타임은 Python 인터프리터
- Java의 런타임은 JVM(Java Virtual Machine)
- JavaScript의 런타임은 브라우저, Node.js
즉 노드는 JavaScript를 브라우저 밖에서도 실행할 수 있게 만든 실행 환경

Node는 기본적으로 아무것도 제공하지 않고, 내가 직접 웹 서버를 만들어야함
```
const http = require('http')

const server = http.createServer((req, res) => {
  res.write('Hello from Node!')
  res.end()
})

server.listen(3000, () => {
  console.log('서버 실행 중: http://localhost:3000')
})
```
Node.js의 http 모듈만으로 만든 서버
하지만 이렇게 일일이 라우팅 분기, 헤더 설정 등을 짜는 건 매우 어려움(오류 위험이 크다)

그래서 프레임워크, Express를 쓴다
```
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.listen(3000, () => {
  console.log('서버 실행 중: http://localhost:3000')
})
```
Node.js는 이벤트 기반으로 동작
```
┌───────────────┐
│ JS 코드 실행  │    ← 우리가 작성하는 코드
└──────┬────────┘
       ↓
┌──────┴───────┐
│ Call Stack   │    ← 동기 실행 (자바스크립트 기본 처리)
├──────────────┤
│ Event Queue  │    ← 비동기 작업 완료시 콜백 저장
├──────────────┤
│ Event Loop   │    ← 스택 비면 큐에서 꺼내 실행
├──────────────┤
│ libuv + OS   │    ← 파일, 네트워크 I/O 백그라운드 처리
└──────────────┘
```

그렇다면 Node.js를 많이 사용하는 이유는?
1. JS를 통해서 백엔드를 만들 수 있음
- 원래 JS는 브라우저에서만 동작했는데, Node.js는 JS를 서버에서도 쓸 수 있게 만든 런타임
- 프론트와 백을 같은 언어로 통일할 수 있어서 개발 효율이 높아짐
- React + Express를 조합하면 풀스택 JS 개발자 가능
2. 비동기 I/O와 이벤트 기반 구조
- Node.js는 non-blocking I/O 구조로 동작
- 즉, 동시에 많은 요청을 처리하는 데 유리함
- 파일 읽기, DB 접근, API 호출 등에서 콜백, Promise, async.await로 빠르고 효율적인 처리 가능
실시간 채팅, 스트리민, API 서버 등에 매우 적합
3. 빠른 실행 속도
- Node.js는 Chrome의 V8엔진을 사용해서 자바스크립트를 매우 빠르게 실행함
- 서버 처리 속도도 빠름
- 비동기 모델과 결합되면 높은 성능을 낼 수 있음

그러면 동기와 비동기를 복습해보자
### 동기
- 작업이 순서대로 진행됨
- 한 작업이 끝나야 다음 작업 수행
### 비동기
- 다음 작업을 기다리지 않고 넘김
- 다른 작업을 병렬적으로 수행 가능

### oath 모델 관련 문제
```
const token = req.user.token
res.json({ token })
```
- 원래는 이런 방식을 사용 했음
```

---

## 📝 최근 주요 변경 이력

- User 모델 구조 개선 (skills: 문자열 배열 → 객체 배열, position/이미지/자기소개 필드 추가)
- 회원가입/프로필 수정 등 주요 API에 express-validator로 입력값 검증 추가
- 이미지 업로드 기능 및 보안(확장자/용량 제한) 적용
- uploads 폴더 .gitignore에 추가
- 더미 데이터 자동 생성 스크립트(`insertDummyData.js`) 추가

---

## 📦 User 모델 구조 예시

```json
{
  "email": "user1@example.com",
  "password": "bcrypt 해시",
  "nickname": "홍길동",
  "skills": [
    { "name": "React", "level": "중급" },
    { "name": "Node.js", "level": "초급" }
  ],
  "position": "웹 프론트엔드",
  "image": "/uploads/파일명.jpg",
  "description": "안녕하세요! 프론트엔드 개발자입니다.",
  "provider": "local"
}
```

---

## 🧪 더미 데이터 삽입 스크립트 사용법

1. 환경변수(.env)에서 MONGODB_URI가 올바르게 설정되어 있는지 확인
2. 아래 명령어 실행

```bash
cd backend
node insertDummyData.js
```

- 유저 20명, 프로젝트 10개, 지원 30개가 자동으로 생성됩니다.

---

## 🖼️ 이미지 업로드 및 보안

- /api/users/upload 엔드포인트로 이미지 업로드
- jpg, jpeg, png, gif, webp만 허용, 최대 2MB
- 업로드된 파일은 /uploads 폴더에 저장되며, .gitignore로 git에 포함되지 않음

---

## ✅ API 입력값 검증

- 회원가입/프로필 수정 등 주요 API에 express-validator 적용
- skills, position, image 등 필드별 유효성 체크
- 잘못된 입력 시 400 에러와 상세 메시지 반환