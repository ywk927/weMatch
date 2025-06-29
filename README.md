# 💡 weMatch

**weMatch**는 사이드 프로젝트를 함께할 팀원을 찾고, 모집하고, 협업할 수 있는 개발자 중심 팀 매칭 플랫폼입니다.

기획자, 디자이너, 개발자 등 다양한 포지션의 사용자들이 <br />
자신의 기술 스택을 바탕으로 프로젝트를 탐색하거나, 직접 생성하여 팀원을 모집할 수 있습니다.


## ✨ 주요 기능

- 🔐 회원가입 / 로그인 (로컬 + 소셜 로그인 예정)
- 🧑‍💻 마이 프로필 페이지 / 타인 프로필 열람
- 🧠 기술 스택 / 포지션 / 자기소개 등 프로필 구성
- 📁 프로젝트 생성 / 수정 / 삭제
- 📥 프로젝트 참여 신청 / 수락 / 거절
- ✅ 내가 신청한 프로젝트 / 확정된 프로젝트 보기
- 🏠 홈에서 다양한 프로젝트와 사용자 탐색
- 💬 (예정) 실시간 채팅 기능


## 🛠 기술 스택

### 💻 Frontend

- React 19
- React Router DOM
- Tailwind CSS
- Zustand (전역 상태 관리)
- Axios (API 통신)

### 🖥 Backend

- Node.js + Express
- MongoDB (Mongoose ODM)
- JWT (토큰 기반 인증)
- bcrypt (비밀번호 암호화)
- multer (이미지 업로드)
- express-validator (회원가입 유효성 검사)


## 🎨 디자인 시안

👉 [Figma 디자인 링크 바로가기](https://www.figma.com/design/iKOKhlPf52sLQcHHOaegcu/weMatch_pjt?node-id=0-1&t=l5OB0ZSc28fsGR8L-1)

> 디자인 시안은 일부 구현과 다를 수 있습니다.
> 

## ⚙ 프로그램 실행 방법

### 1. 저장소 클론

```bash

git clone https://github.com/your-username/weMatch.git

cd weMatch
```

### 2. 프론트엔드 실행

```bash

cd frontend
cd weMatch

npm install
npm run dev

```

### 3. 백엔드 실행

```bash

cd backend
npm install
npm run dev

```

> .env 파일에는 MongoDB 연결 주소, JWT_SECRET 등의 환경 변수가 포함되어야 합니다.
> 

## 📌 기타

### 🔧 트러블슈팅 정리

- 👉 [프론트엔드 문제 모음](./frontend/weMatch/README.troubleshooting.md)
- 👉 [백엔드 문제 모음](./backend/README.troubleshooting.md)

### 📁 디렉토리 구조

```css

Side_Project/
├── frontend/
│   ├── src/
│   └── README.troubleshooting.md
├── backend/
│   ├── models/
│   ├── routes/
│   └── README.troubleshooting.md
└── README.md
```