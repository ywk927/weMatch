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

---

Node.js 프로젝트 시작

### 1. Node.js 설치 및 개발 환경 구축
- Node.js와 npm을 공식 홈페이지에서 설치
- VSCode 등 개발 툴 세팅
- `node -v`, `npm -v`로 버전 확인

### 2. 첫 번째 Node.js 코드 실행
- JS 파일을 만들어서 `console.log('Hello Node!')` 출력
- 터미널에서 `node 파일명.js`로 실행
- 브라우저가 아니라 터미널에서 JS를 실행할 수 있음
- 프로젝트를 편하게 진행하기 위해서 npm run dev로 JS를 실행할 수 있게 설정해둠

### 3. 모듈과 패키지
- npm으로 패키지 설치(`npm install 모듈명`), 삭제(`npm uninstall 모듈명`)
- package.json 파일이 프로젝트의 정보를 담고 있고, 의존성 관리에 중요함
- 기본적으로 npm install로 새로운 패키지를 저장하면 자동으로 package.json이 업데이트 됨

### 4. 간단한 웹 서버 만들기
- http 모듈로 직접 서버를 만들어봄
- 포트 개념, 서버 실행/종료 방법 익힘
- 코드 예시:
```
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello World!');
});
server.listen(3000);
```

### 5. Express 프레임워크 도입
- http 모듈만으로는 라우팅, 파라미터 처리 등이 불편함
- express를 설치(`npm install express`)해서 사용
- 라우팅, 미들웨어, body-parser 등 기본 개념 익힘
- 코드 예시:
```
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Express!'));
app.listen(3000);
```

### 6. REST API 기초
- GET, POST, PUT, DELETE 메서드 실습
- Postman으로 직접 API 요청 테스트
- RESTful하게 라우팅을 설계하는 법을 익힘

### 7. 데이터 저장
- 처음에는 배열 등 메모리로 데이터 임시 저장
- fs 모듈로 파일에 데이터 저장/불러오기 실습
- MongoDB, Mongoose로 DB 연동 시도
- MongoDB에 연결해서 local이 아닌 서버 DB를 사용해볼 수 있음

### 8. 비동기 프로그래밍 실습
- setTimeout, setInterval로 비동기 동작 실습
- 콜백 함수, Promise, async/await로 비동기 처리 방식 비교
- 콜백 지옥을 경험하고, Promise/async-await의 필요성을 느낌


---

## 최근 주요 변경 이력

- User 모델 구조 개선 (skills: 문자열 배열 → 객체 배열, position/이미지/자기소개 필드 추가)
- 회원가입/프로필 수정 등 주요 API에 express-validator로 입력값 검증 추가
- 이미지 업로드 기능 및 보안(확장자/용량 제한) 적용
- uploads 폴더 .gitignore에 추가
- 더미 데이터 자동 생성 스크립트(`insertDummyData.js`) 추가

---

## User 모델 구조 예시

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

## 더미 데이터 삽입 스크립트 사용법

1. 환경변수(.env)에서 MONGODB_URI가 올바르게 설정되어 있는지 확인
2. 아래 명령어 실행

```bash
cd backend
node insertDummyData.js
```

- 유저 20명, 프로젝트 10개, 지원 30개가 자동으로 생성됩니다.

---

## 이미지 업로드 및 보안

- /api/users/upload 엔드포인트로 이미지 업로드
- jpg, jpeg, png, gif, webp만 허용, 최대 2MB
- 업로드된 파일은 /uploads 폴더에 저장되며, .gitignore로 git에 포함되지 않음

---

## API 입력값 검증

- 회원가입/프로필 수정 등 주요 API에 express-validator 적용
- skills, position, image 등 필드별 유효성 체크
- 잘못된 입력 시 400 에러와 상세 메시지 반환
