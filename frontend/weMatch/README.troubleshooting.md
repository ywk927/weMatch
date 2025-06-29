# 🛠 프론트엔드 트러블슈팅 (weMatch)

개발 과정에서 실제로 겪었던 문제 상황과 그에 대한 원인, 해결 방법을 정리했습니다.

모든 항목은 실습 및 협업 과정에서 발생한 실제 이슈를 기반으로 작성되었습니다.

---

## ✅ 프로필 페이지 구현 중 발생한 문제

### 🎯 구현 목표

- 로그인한 사용자가 자신의 정보를 수정할 수 있는 **마이프로필 페이지** 구현
- 다른 사용자의 정보를 열람할 수 있는 **타인 프로필 페이지** 구현
- **기술 스택 등록, 이미지 업로드, 자기소개 작성** 등의 기능 포함

---

### 1. 로그인 상태에서 토큰이 `null`로 나오는 문제

- **문제**: `fetchUser()`에서 `localStorage`로부터 토큰이 `null` 반환
- **원인**: Postman으로 로그인하면 브라우저 `localStorage`에 토큰이 없음
- **해결**:
    
    ```jsx
    
    localStorage.setItem('auth', JSON.stringify({ token: '발급받은토큰', isAuthenticated: true }))
    
    ```
    

---

### 2. Zustand store에서 `user` 상태 불러오기 실패

- **문제**: `useUserStore()` 사용 시 `undefined` 에러 발생
- **원인**: 토큰 없이 API 요청 → 상태값 업데이트 실패
- **해결**:
    - `fetchUser` 내부에서 토큰 유무 확인
    - 컴포넌트에선 optional chaining 사용
        
        `user?.skills?.map(...)`
        

---

### 3. React에서 Pinia 사용하려 했던 실수

- **문제**: React에 Vue 전용 상태관리 도구인 Pinia 적용 시도
- **해결**: `Zustand`로 전환 → React 전용 상태관리 도구 사용

---

### 4. 프로필 이미지 업로드 실패 (500 에러)

- **문제**: `ENOENT: no such file or directory` 에러
- **원인**: `uploads/` 폴더가 존재하지 않음
- **해결**:
    
    ```jsx
    
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
    
    ```
    

---

### 5. 이미지가 프론트에 표시되지 않음

- **문제**: DB에는 저장됐지만 렌더링되지 않음
- **원인**: URL 조합 문제 or 백엔드 응답에 image 필드 누락
- **해결**:
    - `http://localhost:3000${user.image}`로 렌더링
    - 백엔드 `.select('image')` 설정

---

## ✅ 공통 기능/스타일 관련 이슈

### 6. JWT 토큰 저장 및 axios 자동 주입 문제

- **문제**: 새로고침 후 토큰이 반영되지 않거나, axios 헤더에 누락됨
- **해결**:
    
    ```jsx
    
    const raw = localStorage.getItem('user-store')
    const parsed = raw ? JSON.parse(raw) : null
    const token = parsed?.state?.token
    config.headers.Authorization = `Bearer ${token}`
    
    ```
    

---

### 7. 로그인 실패 (401 Unauthorized)

- **원인**:
    - 잘못된 API 주소
    - CORS 설정 누락
    - 빈 값 전달
    - JWT_SECRET 누락
    - bcrypt 비교 실패 (백엔드)
- **해결**:
    - `.env` 점검
    - form validation 보강
    - 응답 메시지를 명확하게 프론트에 전달

---

### 8. 라우팅 + 모달 조합 이슈

- **문제**: location.state 기반 모달이 새로고침/뒤로가기 시 전체 전환됨
- **해결**:
    - `/login`, `/signup` 같은 별도 페이지로 라우팅 리팩토링
    - `useLocation()` + 조건부 렌더링 조합 개선

---

### 10. react-quill 에디터 삽입 실패

- **문제**: 스타일이 깨지고 편집기 기능이 이상함
- **원인**: Tailwind와 CSS 충돌, 커스터마이징 한계
- **해결**: `react-quill` 제거 → `textarea` + Tailwind로 편집기 구현

---

## 💬 느낀 점

- 단순한 기능 구현보다 **상태 흐름과 시점 제어**가 중요
- `console.log()`를 통한 디버깅은 가장 강력한 도구
- 팀 협업에서 발생할 수 있는 Git, CSS 충돌은 **초기 규칙화가 핵심**
- 불안정한 외부 라이브러리보단 **단순한 기본 구현 + Tailwind 스타일**이 더 유지보수에 유리