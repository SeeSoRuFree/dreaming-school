# CLAUDE.md

## 프로젝트 개요
꿈을 짓는 학교 사회적협동조합의 소개 웹사이트를 Next.js로 개발한 프로젝트입니다. 교육 프로그램 관리, 회원 시스템, 크루 봉사자 커뮤니티를 제공하는 종합 플랫폼입니다.

## 개발 완료 기능

### 🏠 메인 페이지 (/)
- **다중 테마 시스템**: 7가지 테마 선택 가능
  - Default (기본)
  - Creative (창의적)
  - Dynamic (역동적)
  - Nature (자연친화)
  - ModernProfessional (모던 전문)
  - EcoEducation (에코 교육)
  - VibrantCommunity (활기찬 커뮤니티)
- **히어로 섹션**: 애니메이션 텍스트 효과
- **이미지 갤러리**: 무한 스크롤 갤러리
- **프로그램 소개**: 5개 주요 프로그램 카드
- **연혁 타임라인**: 2020년부터 현재까지
- **파트너십 섹션**: 협력 기관 로고 표시

### 📚 교육프로그램 (/programs)
- **프로그램 목록**: 5개 카테고리 프로그램
  - **집짓기**: 한평 집짓기, 벽걸이용 모형집짓기, 한평형 모형집짓기, 두평형 모형집짓기
  - **원예**: 분경수업, 테라리움수업, 플렌테리어수업, 정원만들기수업, 압화캐릭터수업, 리스화관수업, 축하꽃양초수업, 아로마 꽃 비누수업, 우드버닝화수업
  - **과학창의**: 과학교육, 창의목공
  - **농촌활성화**: 농촌주민들과 함께하는 세상에서 가장 위대한 한평집짓기, 농촌주민들과 함께하는 원예치유프로그램, 함께하는 농촌지역 살리기 컨설팅
  - **리모델링**: 공간 재창조 리모델링 사업 (실내,실외)
- **프로그램 상세 페이지** (/programs/[id])
  - 이미지 캐러셀
  - 프로그램 상세 정보
  - 신청 모달 폼
  - 관련 프로그램 추천

### 👣 걸어온 발자취 (/footsteps)
- **게시판 형식**: 프로그램 활동 후기 및 성과 공유
- **카테고리 필터**: 집짓기, 원예, 과학창의, 농촌활성화, 리모델링, 기타
- **검색 기능**: 제목, 프로그램명, 내용 검색
- **게시글 상세 페이지** (/footsteps/[id])
  - 프로그램 카테고리 및 명 표시
  - 작성자 및 작성일 정보
  - 텍스트 에디터로 작성된 풍부한 내용 (인라인 이미지 포함)
- **관리자 기능**: TipTap 에디터를 통한 게시글 작성/수정, 이미지 업로드

### 📰 소식 및 공지 (/news)
- **카테고리 필터**: 전체/소식/공지 필터링
- **검색 기능**: 제목 및 내용 검색
- **페이지네이션**: 10개씩 페이지 분할
- **상세 보기 모달**: 공지사항 상세 내용

### 📞 문의하기 (/contact)
- **일반 문의**: 카테고리별 문의 폼
  - 교육프로그램
  - 시설이용
  - 기타
- **후원 문의**: 후원 유형별 폼
  - 기업 후원
  - 물품 후원
  - 장비 후원
  - 개인 후원

### 👥 크루 시스템
- **크루 신청** (/crew-application)
  - 동기 및 경험 입력
  - 활동 가능 시간
  - 보유 기술 선택
- **크루들의 방** (/crew-room) - 개발 예정
  - 크루 전용 게시판
  - 게시글 작성/수정/삭제
  - 좋아요 및 댓글 기능

### 🔐 관리자 페이지 (/admin)
- **대시보드**: 전체 통계 및 현황
  - 총 회원 수
  - 크루 현황
  - 프로그램 신청 통계
  - 문의 현황
- **공지사항 관리**: CRUD 기능
- **프로그램 관리**: 프로그램 정보 수정
- **회원 관리**: 회원 목록 및 상세 정보
- **크루 관리**: 신청 승인/거절
- **문의 관리**: 문의 내역 확인 및 답변
- **미디어 관리**: 이미지/동영상 업로드

### 🎨 UI/UX 컴포넌트

#### 레이아웃 컴포넌트
- **Header**: 반응형 네비게이션 바
- **Footer**: 사이트맵 및 연락처 정보

#### UI 컴포넌트
- **AlertModal**: 알림 메시지 표시
- **ConfirmModal**: 확인/취소 다이얼로그
- **AnimatedHeroText**: 타이핑 애니메이션 텍스트
- **ProgramImageCarousel**: 이미지 슬라이더
- **HomeImageGallery**: 홈 이미지 갤러리
- **InfiniteScrollGallery**: 무한 스크롤 갤러리
- **FloatingButtons**: 플로팅 액션 버튼
- **CustomCursor**: 커스텀 마우스 커서
- **ThemeSelector**: 테마 선택기

#### 폼 컴포넌트
- **ApplicationModal**: 프로그램 신청 모달
- **GeneralInquirySection**: 일반 문의 폼
- **DonationInquirySection**: 후원 문의 폼

## 기술 스택

### 프레임워크 및 라이브러리
- **Next.js 15.1.3**: React 기반 풀스택 프레임워크
- **React 19**: UI 라이브러리
- **TypeScript 5**: 정적 타입 지원
- **Tailwind CSS 3.4**: 유틸리티 기반 CSS
- **shadcn/ui**: 재사용 가능한 UI 컴포넌트

### 주요 패키지
- **@radix-ui**: 접근성 있는 UI 프리미티브
- **lucide-react**: 아이콘 라이브러리
- **clsx**: 조건부 클래스명 유틸리티
- **date-fns**: 날짜 포맷팅
- **embla-carousel**: 캐러셀 컴포넌트
- **framer-motion**: 애니메이션 라이브러리
- **react-intersection-observer**: 스크롤 감지

## 데이터 관리

### localStorage 키
- `users` - 회원 정보 목록
- `currentUser` - 현재 로그인 사용자
- `programs` - 교육프로그램 목록
- `programApplications` - 프로그램 신청 내역
- `notices` - 공지사항 목록
- `inquiries` - 문의 내역
- `crewApplications` - 크루 신청 내역
- `crew-posts` - 크루 게시판 글
- `selectedTheme` - 선택된 테마
- `adminAuth` - 관리자 인증 정보
- `emailTemplates` - 이메일 템플릿
- `emailsSent` - 발송 이메일 기록
- `mediaFiles` - 미디어 파일 정보

### 데이터 타입 (TypeScript)
```typescript
// 주요 인터페이스
- Program: 교육프로그램
- User: 사용자 정보
- News: 소식/공지사항
- Contact: 문의 정보
- CrewApplication: 크루 신청
- CrewPost: 크루 게시글
- Member: 회원 정보
- HistoryItem: 연혁 항목
```

## 인증 시스템

### 사용자 역할
1. **guest**: 비로그인 사용자
2. **member**: 일반 회원
3. **crew**: 승인된 크루 봉사자
4. **admin**: 관리자

### 페이지 접근 권한
- **공개**: 홈, 프로그램, 소식, 문의
- **회원 전용**: 크루 신청, 프로그램 신청
- **크루 전용**: 크루들의 방
- **관리자 전용**: 관리자 페이지 전체

### 관리자 계정
- 이메일: admin@dreamschool.or.kr
- 비밀번호: admin123!

## 프로젝트 구조
```
src/
├── app/                      # Next.js App Router
│   ├── page.tsx             # 홈페이지
│   ├── about/               # ABOUT 페이지
│   ├── programs/            # 교육프로그램
│   │   └── [id]/           # 프로그램 상세
│   ├── news/                # 소식 및 공지
│   ├── contact/             # 문의하기
│   ├── crew-application/    # 크루 신청
│   └── admin/               # 관리자 페이지
│       ├── page.tsx         # 대시보드
│       ├── login/           # 관리자 로그인
│       ├── crew-management.tsx
│       ├── inquiry-management.tsx
│       ├── media-management.tsx
│       ├── members-management.tsx
│       └── news-management.tsx
├── components/              # 재사용 컴포넌트
│   ├── ui/                  # UI 컴포넌트
│   ├── layout/              # 레이아웃
│   ├── themes/              # 테마별 컴포넌트
│   ├── programs/            # 프로그램 관련
│   ├── contact/             # 문의 관련
│   └── auth/                # 인증 관련
├── contexts/                # React Context
│   └── ThemeContext.tsx    # 테마 관리
├── hooks/                   # 커스텀 훅
│   ├── useAuth.ts          # 사용자 인증
│   ├── useAdminAuth.ts     # 관리자 인증
│   ├── useAlert.ts         # 알림 시스템
│   └── useConfirm.ts       # 확인 다이얼로그
├── lib/                     # 유틸리티
│   ├── utils.ts            # 공통 유틸
│   ├── auth.ts             # 인증 로직
│   ├── mock-data.ts        # 목 데이터
│   ├── admin-mock-data.ts  # 관리자 목 데이터
│   ├── program-images.ts   # 프로그램 이미지
│   └── home-images.ts      # 홈 이미지
└── types/                   # TypeScript 타입
    └── index.ts            # 타입 정의
```

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

## 환경 설정
- Node.js 18.0 이상 필요
- 모든 데이터는 localStorage 기반 (백엔드 없음)
- 개발 서버: http://localhost:3000

## 디자인 시스템

### 색상 팔레트
- **Primary**: Blue 계열 (#1d4ed8, #1e3a8a)
- **Secondary**: Amber (#fbbf24), Emerald (#10b981)
- **Neutral**: Gray 계열
- **Background**: White, Blue-50

### 컴포넌트 스타일
- **버튼**: Primary, Secondary, Soft 변형
- **카드**: 기본, 강조, 프로그램 카드
- **입력**: 텍스트 필드, 텍스트영역
- **모달**: 다이얼로그, 알림, 확인

### 반응형 브레이크포인트
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## 주요 특징

### 성능 최적화
- 이미지 지연 로딩
- 무한 스크롤 페이지네이션
- 컴포넌트 코드 스플리팅

### 접근성
- ARIA 레이블 적용
- 키보드 네비게이션 지원
- 포커스 관리

### SEO 최적화
- 메타데이터 설정
- 시맨틱 HTML
- 구조화된 데이터

## 향후 개발 계획

### 단기 계획
- [ ] 크루들의 방 게시판 구현
- [ ] 이메일 알림 시스템
- [ ] 파일 업로드 기능
- [ ] 프로그램 결제 시스템

### 장기 계획
- [ ] 백엔드 API 통합 (Supabase/Firebase)
- [ ] 실시간 채팅 기능
- [ ] 모바일 앱 개발
- [ ] 다국어 지원

## 테스트 계정

### 일반 회원
- 이메일: test@example.com
- 비밀번호: test123

### 크루 봉사자
- 이메일: crew@example.com
- 비밀번호: crew123

### 관리자
- 이메일: admin@dreamschool.or.kr
- 비밀번호: admin123!

## 문제 해결

### localStorage 초기화
```javascript
// 브라우저 콘솔에서 실행
localStorage.clear()
location.reload()
```

### 목 데이터 재설정
- 페이지 새로고침 시 자동으로 초기 데이터 로드
- `lib/mock-data.ts`에서 초기 데이터 수정 가능

## 기여 가이드라인

### 코드 스타일
- TypeScript strict 모드 사용
- ESLint 규칙 준수
- Prettier 포맷팅 적용

### 커밋 메시지
- feat: 새로운 기능
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 포맷팅
- refactor: 코드 리팩토링
- test: 테스트 추가
- chore: 빌드 작업

### 브랜치 전략
- main: 프로덕션 브랜치
- develop: 개발 브랜치
- feature/*: 기능 개발
- hotfix/*: 긴급 수정

## 라이선스
본 프로젝트는 꿈을 짓는 학교 사회적협동조합 소유입니다.

## 연락처
- 웹사이트: (배포 예정)
- 이메일: contact@dreamschool.or.kr
- 전화: 010-1234-5678