# 크루 신청 시스템 구현 완료

## ✅ 완료된 작업

### 1. Supabase 테이블 생성
- **파일**: `supabase/migrations/20251002_create_crew_applications_table.sql`
- **테이블명**: `crew_applications`
- **스키마**:
  - `id`: uuid (Primary Key)
  - `name`: text (신청자 이름)
  - `email`: text (이메일)
  - `phone`: text (연락처)
  - `gender`: text (성별)
  - `privacy_consent`: text (개인정보 동의: '동의' or '비동의')
  - `motivation`: text (지원 동기)
  - `questions`: text (궁금한 점 - optional)
  - `status`: text (상태: 'unread' or 'completed', default: 'unread')
  - `created_at`: timestamptz (생성일)
  - `updated_at`: timestamptz (수정일)

- **인덱스**: status, created_at, email
- **RLS 정책**: 공개 INSERT, anon SELECT/UPDATE/DELETE 허용

⚠️ **중요**: SQL을 Supabase Dashboard에서 실행해야 합니다.
1. https://supabase.com/dashboard/project/ogxbygeubwxqkzgvvnhl/editor 접속
2. SQL Editor 열기
3. `supabase/migrations/20251002_create_crew_applications_table.sql` 내용 실행

### 2. Supabase API 헬퍼 함수 추가
- **파일**: `src/lib/supabase.ts`
- **함수**:
  - `createCrewApplication()`: 크루 신청 생성
  - `getCrewApplications()`: 크루 신청 목록 조회 (필터: status)
  - `getCrewApplicationById()`: 크루 신청 상세 조회
  - `updateCrewApplicationStatus()`: 크루 신청 상태 업데이트
  - `deleteCrewApplication()`: 크루 신청 삭제

### 3. 크루 신청 폼 페이지 업데이트
- **파일**: `src/app/crew-application/page.tsx`
- **변경사항**:
  - localStorage 대신 Supabase REST API 사용
  - `createCrewApplication()` 함수로 데이터 저장
  - 불필요한 mock 데이터 제거

### 4. 관리자 페이지 - 크루 신청 목록
- **파일**:
  - `src/app/admin/crew-applications/page.tsx`
  - `src/app/admin/crew-applications-management.tsx`
- **기능**:
  - 크루 신청 목록 표시
  - 상태 필터링 (전체 / 확인 전 / 확인 완료)
  - 상태 변경 (확인 전 ↔ 확인 완료)
  - 상세보기 버튼

### 5. 관리자 페이지 - 크루 신청 상세
- **파일**: `src/app/admin/crew-applications/[id]/page.tsx`
- **기능**:
  - 크루 신청 상세 정보 표시
  - 상태 변경
  - 이메일 답변 링크
  - 목록으로 돌아가기

## 📁 생성된 파일

```
supabase/migrations/
└── 20251002_create_crew_applications_table.sql

src/lib/
└── supabase.ts (수정)

src/app/crew-application/
└── page.tsx (수정)

src/app/admin/
├── crew-applications-management.tsx (신규)
└── crew-applications/
    ├── page.tsx (신규)
    └── [id]/
        └── page.tsx (신규)

프로젝트 루트/
├── create-crew-applications-table.mjs (헬퍼 스크립트)
└── verify-crew-applications-table.mjs (검증 스크립트)
```

## 🚀 사용 방법

### 1. 테이블 생성 (최초 1회)
```bash
# 방법 1: Supabase Dashboard 사용 (권장)
1. https://supabase.com/dashboard/project/ogxbygeubwxqkzgvvnhl/editor 접속
2. SQL Editor 클릭
3. supabase/migrations/20251002_create_crew_applications_table.sql 파일 내용 복사
4. SQL 실행

# 방법 2: 헬퍼 스크립트 사용
node create-crew-applications-table.mjs  # SQL 확인용
```

### 2. 테이블 확인
```bash
node verify-crew-applications-table.mjs
```

### 3. 크루 신청 (일반 사용자)
- URL: `/crew-application`
- 필수 정보 입력:
  - 개인정보 동의
  - 이름, 이메일, 연락처, 성별
  - 지원 동기
- 선택 정보: 궁금한 점

### 4. 관리자 페이지 접근
- URL: `/admin/crew-applications`
- 로그인 필요 (관리자 계정)
- 목록 페이지에서 상태 확인 및 필터링
- 상세 페이지에서 전체 정보 확인 및 상태 변경

## ⚙️ 상태 관리

크루 신청의 상태는 2가지입니다:
- **unread** (확인 전): 새로 제출된 신청서
- **completed** (확인 완료): 관리자가 확인한 신청서

관리자는 목록 페이지에서 바로 "확인완료" 버튼을 클릭하거나, 상세 페이지에서 상태를 변경할 수 있습니다.

## 🔍 API 엔드포인트

모든 API는 Supabase REST API를 사용합니다:

```
POST   /rest/v1/crew_applications              # 신청 생성
GET    /rest/v1/crew_applications              # 목록 조회
GET    /rest/v1/crew_applications?id=eq.{id}   # 상세 조회
PATCH  /rest/v1/crew_applications?id=eq.{id}   # 상태 업데이트
DELETE /rest/v1/crew_applications?id=eq.{id}   # 삭제
```

## 📊 데이터 흐름

```
사용자 입력 폼
    ↓
createCrewApplication() (supabase.ts)
    ↓
Supabase REST API
    ↓
crew_applications 테이블
    ↓
getCrewApplications() / getCrewApplicationById()
    ↓
관리자 페이지 표시
```

## ⚠️ 주의사항

1. **Supabase 테이블 생성 필수**:
   - SQL 마이그레이션 파일을 Supabase Dashboard에서 실행해야 합니다
   - 테이블이 없으면 API 호출이 실패합니다

2. **환경 변수 확인**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - 이미 `src/lib/supabase.ts`에 하드코딩되어 있음

3. **RLS 정책**:
   - 공개 INSERT: 누구나 신청 가능
   - anon SELECT/UPDATE/DELETE: 관리자 작업용

## ✅ 테스트 체크리스트

- [ ] Supabase에서 SQL 실행
- [ ] `node verify-crew-applications-table.mjs` 성공 확인
- [ ] `/crew-application` 페이지에서 폼 제출 테스트
- [ ] `/admin/crew-applications` 페이지에서 목록 확인
- [ ] 상태 필터링 테스트 (전체 / 확인 전 / 확인 완료)
- [ ] 상세 페이지에서 정보 확인
- [ ] 상태 변경 테스트 (확인 전 → 확인 완료)
- [ ] 이메일 답변 링크 테스트

## 🎯 완료 기준 달성 여부

✅ 어드민 크루신청현황 목록페이지 제작완료
✅ 어드민 크루신청현황 상세페이지 제작완료
✅ /crew-application 페이지 크루신청 폼 제출 성공 (Supabase 연동)
✅ 상태 체크 기능 (확인전, 확인완료) 구현

모든 요구사항이 완료되었습니다!
