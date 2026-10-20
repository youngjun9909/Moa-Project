# MOA

취미 기반 모임 커뮤니티 플랫폼. React(프론트) + Spring Boot(백엔드) + MySQL.

```
moa-web/moa   React (CRA, TypeScript, Emotion)
moa-was/moa   Spring Boot 3 (Java 17, JPA, Security, WebSocket)
moa-etc       SQL 스키마
```

## 로컬 실행

### 백엔드
`moa-was/moa/.env`를 만든 뒤 `moa-was/moa`에서 실행합니다.

```
DB_USERNAME=...
DB_PASSWORD=...
JWT_SECRET=...            # base64 문자열
MAIL_USERNAME=...         # Gmail 주소
MAIL_PASSWORD=...         # Gmail 앱 비밀번호(16자)
KAKAO_CLIENT_ID=...
KAKAO_CLIENT_SECRET=...
NAVER_CLIENT_ID=...
NAVER_CLIENT_SECRET=...
APP_FRONTEND_URL=http://localhost:3000
```

```
./gradlew bootRun        # http://localhost:6060
```

### 프론트
`moa-web/moa/.env`를 만든 뒤 실행합니다.

```
REACT_APP_API_URL=http://localhost:6060
REACT_APP_FRONTEND_URL=http://localhost:3000
REACT_APP_NAVER_API=...   # NCP Maps Application의 Client ID
```

```
npm install
npm start                # http://localhost:3000
```

## 무료 배포 (포트폴리오 데모용)

| 구성 | 서비스 | 비고 |
|---|---|---|
| 프론트 | Vercel (또는 Netlify) | Root Directory를 `moa-web/moa`로 지정. `vercel.json`에 빌드 설정과 SPA 라우팅이 들어 있음 |
| 백엔드 | Render 무료 Web Service (Docker) | `moa-was/moa/Dockerfile`. 15분 미사용 시 잠들어 첫 응답이 느림 |
| DB | TiDB Cloud 무료 (MySQL 호환) | 접속 정보를 `DB_URL`로 전달 |

### 백엔드 환경변수 (Render)
로컬 `.env`의 값에 더해 아래를 설정합니다.

| 변수 | 예시 / 설명 |
|---|---|
| `DB_URL` | `jdbc:mysql://<host>:4000/moa_db?sslMode=VERIFY_IDENTITY` |
| `DB_USERNAME`, `DB_PASSWORD` | DB 계정 |
| `APP_FRONTEND_URL` | 배포된 프론트 주소 (예: `https://moa.vercel.app`) |
| `APP_CORS_ALLOWED_ORIGINS` | 위와 동일한 프론트 주소 |
| `JPA_SHOW_SQL` | `false` |
| `JPA_DDL_AUTO` | 최초 1회 `update`(테이블 생성), 이후 `none` 권장 |
| `PORT` | Render가 자동 주입 |
| `STORAGE_TYPE` | `supabase` (기본값 `local`: 서버 디스크에 저장) |
| `SUPABASE_URL` | `https://<프로젝트ref>.supabase.co` |
| `SUPABASE_SERVICE_KEY` | Supabase Secret key (서버 전용, 프론트에 넣지 말 것) |
| `SUPABASE_BUCKET` | 공개(public) 버킷 이름, 기본값 `moa-images` |

### 프론트 환경변수 (Vercel)
| 변수 | 값 |
|---|---|
| `REACT_APP_API_URL` | 배포된 백엔드 주소 (예: `https://moa-api.onrender.com`) |
| `REACT_APP_FRONTEND_URL` | 배포된 프론트 주소 |
| `REACT_APP_NAVER_API` | NCP Maps Client ID |

### 배포 후 해야 할 외부 설정
- 카카오/네이버 개발자센터 Callback URL에 `https://<백엔드 주소>/oauth2/callback/kakao`, `.../naver` 추가
- 네이버 개발자센터 서비스 URL에 프론트 주소 추가
- NCP Maps Application의 Web 서비스 URL에 프론트 도메인(포트 없이) 추가

### 알려진 제한
- `STORAGE_TYPE=local`(기본)이면 업로드 이미지가 서버 디스크(`./image/`)에 저장되어, 무료 서버가 재시작되면 사라집니다. 배포에서는 `supabase`를 사용하세요.
- 채팅(WebSocket)은 서버가 잠들면 연결이 끊깁니다.
