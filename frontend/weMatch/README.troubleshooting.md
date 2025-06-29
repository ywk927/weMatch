## 프로필 페이지 구현 과정에서 마주한 문제점과 해결 과정

### 구현 목표
- 로그인한 사용자가 자신의 정보를 수정할 수 있는 **마이프로필 페이지** 구현
- 다른 사용자의 정보를 열람할 수 있는 **타인 프로필 페이지** 구현
- **기술 스택 등록, 이미지 업로드, 자기소개 작성** 등의 기능 포함

---

### 1. 로그인 상태에서 토큰이 `null`로 나오는 문제
- **문제점**: `fetchUser()`에서 `localStorage`로부터 토큰을 불러오는데 `null`이 반환됨
- **원인**: Postman을 통해 로그인할 경우, 브라우저의 `localStorage`에 토큰이 저장되지 않음
- **해결 방법**: 개발자 도구 콘솔에서 `localStorage.setItem()`으로 직접 토큰을 저장하여 문제 해결

  ```js
  localStorage.setItem('auth', JSON.stringify({ token: '발급받은토큰', isAuthenticated: true }))
  ```

---

### 2. Zustand store에서 `user` 데이터를 제대로 불러오지 못하는 문제
- **문제점**: `useUserStore()`로 user 상태를 불러오려 했으나, `undefined` 에러 발생
- **원인**: `fetchUser` 실행 시점에 토큰이 `null`이어서 요청 실패 → 상태값이 업데이트되지 않음
- **해결 방법**:
  - `fetchUser` 내부에서 토큰 존재 여부 확인 후 요청 수행
  - 컴포넌트에서는 `user?.skills?.map(...)` 등 optional chaining 사용

---

### 3. React에서 `pinia` 사용하려 했던 실수
- **문제점**: Vue 전용 상태 관리 라이브러리인 Pinia를 React에서 사용하려고 시도함
- **해결 방법**: React에서는 `Zustand`, `Redux`, `Context API` 등 전용 상태 관리 도구를 사용하는 것이 일반적임을 인지하고 `Zustand`로 전환

---

### 4. 프로필 이미지 업로드 실패 (500 에러)
- **문제:** 이미지 업로드 시 서버에서 `ENOENT: no such file or directory` 오류 발생  
- **원인:** `uploads/` 폴더가 서버 루트에 존재하지 않아서 multer가 저장하지 못함
- **해결:** `uploads/` 폴더 직접 생성 및 `express.static()`을 통해 `/uploads` 경로 정적 서빙 처리
```js
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

```

---

### 5. 이미지가 프론트에서 표시되지 않음
- **문제:** DB에는 /uploads/파일명으로 저장되었지만 이미지가 보이지 않음
- **원인:** 이미지 경로를 프론트에서 잘못 조합했거나, 백엔드 응답에 이미지 경로가 없었음
- **해결:** user.image가 존재할 경우: `http://localhost:3000${user.image}` 형식으로 경로 조합

백엔드 응답에서 image를 포함하도록 .select() 설정

---

##  느낀 점
- 단순히 토큰을 백엔드에서 발급받는 것에 그치지 않고, **프론트에서 적절히 저장하고 활용하는 로직**이 중요하다는 걸 깨달음
- `console.log()`를 적극적으로 활용하며 문제 원인을 추적하는 습관이 개발 속도에 큰 영향을 준다는 걸 체감함
